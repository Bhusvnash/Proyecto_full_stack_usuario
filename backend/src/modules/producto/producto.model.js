import db from '../../config/dbconnection.js';

/**
 * @description Modelo de datos para la tabla producto (ferretería)
 * Ahora 'codigo' es el identificador autoincremental
 */
export const ProductoModel = {

    /**
     * Obtiene todos los productos, opcionalmente filtrados por búsqueda y/o unidad.
     */
    getAll: async (buscar = null, unidad = null) => {
        let sql = "SELECT codigo, descripcion, unidad, costo, precio FROM producto";
        const params = {};
        const conditions = [];

        if (buscar) {
            if (!isNaN(Number(buscar))) {
                // Si es número, buscar por codigo exacto
                conditions.push("codigo = :buscarNum");
                params.buscarNum = Number(buscar);
            } else {
                // Si es texto, buscar en descripcion
                conditions.push("descripcion LIKE :buscarText");
                params.buscarText = `%${buscar}%`;
            }
        }
        if (unidad) {
            conditions.push("unidad = :unidad");
            params.unidad = unidad;
        }

        if (conditions.length > 0) {
            sql += " WHERE " + conditions.join(" AND ");
        }
        sql += " ORDER BY descripcion";

        const [rows] = await db.query(sql, params);
        return rows;
    },

    /**
     * Obtiene un producto por su codigo (ahora autoincremental).
     */
    getById: async (codigo) => {
        const sql = "SELECT codigo, descripcion, unidad, costo, precio FROM producto WHERE codigo = :codigo";
        const [rows] = await db.query(sql, { codigo });
        return rows;
    },

    /**
     * Obtiene un producto por su código (mismo que getById ya que codigo es el PK).
     */
    getByCodigo: async (codigo) => {
        const sql = "SELECT codigo, descripcion, unidad, costo, precio FROM producto WHERE codigo = :codigo";
        const [rows] = await db.query(sql, { codigo });
        return rows;
    },

    /**
     * Crea un nuevo producto. El 'codigo' se genera automáticamente.
     */
    create: async (data) => {
        const sql = `INSERT INTO producto (descripcion, unidad, costo, precio)
                    VALUES (:descripcion, :unidad, :costo, :precio)`;
        const [result] = await db.query(sql, {
            descripcion: data.descripcion,
            unidad: data.unidad,
            costo: data.costo,
            precio: data.precio
        });
        return result;
    },

    /**
     * Actualiza un producto por codigo.
     */
    updateById: async (codigo, data) => {
        const sql = `UPDATE producto SET 
            descripcion = :descripcion, 
            unidad = :unidad, 
            costo = :costo, 
            precio = :precio 
            WHERE codigo = :codigo`;
        const [result] = await db.query(sql, {
            codigo,
            descripcion: data.descripcion,
            unidad: data.unidad,
            costo: data.costo,
            precio: data.precio
        });
        return result.affectedRows > 0;
    },

    /**
     * Elimina un producto por codigo.
     */
    deleteById: async (codigo) => {
        const sql = "DELETE FROM producto WHERE codigo = :codigo";
        const [result] = await db.query(sql, { codigo });
        return result.affectedRows > 0;
    }
};