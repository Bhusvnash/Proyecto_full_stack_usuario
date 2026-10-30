import { ProductoModel } from "./producto.model.js";

const UNIDADES_PERMITIDAS = ["bulto", "kilos", "libras", "unidad", "metro"];

const errorResponse = (res, status, mensaje) => {
    return res.status(status).json({ error: mensaje });
};

export const getAll = async (req, res) => {
    try {
        const { buscar, unidad } = req.query;
        const productos = await ProductoModel.getAll(buscar || null, unidad || null);
        return res.status(200).json(productos);
    } catch (e) {
        console.error("Error en getAll productos:", e);
        return errorResponse(res, 500, "Error interno del servidor");
    }
};

export const getById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id || isNaN(Number(id))) {
            return errorResponse(res, 400, "Código inválido");
        }

        const rows = await ProductoModel.getById(Number(id));
        if (rows.length === 0) {
            return errorResponse(res, 404, "Producto no encontrado");
        }
        return res.status(200).json(rows[0]);
    } catch (e) {
        console.error("Error en getById producto:", e);
        return errorResponse(res, 500, "Error interno del servidor");
    }
};

export const getByCodigo = async (req, res) => {
    try {
        const { codigo } = req.params;
        if (!codigo || isNaN(Number(codigo))) {
            return errorResponse(res, 400, "Código inválido");
        }

        const rows = await ProductoModel.getByCodigo(Number(codigo));
        if (rows.length === 0) {
            return errorResponse(res, 404, "Producto no encontrado");
        }
        return res.status(200).json(rows[0]);
    } catch (e) {
        console.error("Error en getByCodigo producto:", e);
        return errorResponse(res, 500, "Error interno del servidor");
    }
};

export const create = async (req, res) => {
    const { descripcion, unidad, costo, precio } = req.body ?? {};

    if (!descripcion || !unidad || costo === undefined || precio === undefined) {
        return errorResponse(res, 400, "Faltan datos obligatorios");
    }

    if (!UNIDADES_PERMITIDAS.includes(unidad)) {
        return errorResponse(res, 400, `Unidad inválida. Permitidas: ${UNIDADES_PERMITIDAS.join(", ")}`);
    }

    const costoNum = Number(costo);
    const precioNum = Number(precio);

    if (isNaN(costoNum) || costoNum < 0) {
        return errorResponse(res, 400, "Costo debe ser un número >= 0");
    }
    if (isNaN(precioNum) || precioNum < 0) {
        return errorResponse(res, 400, "Precio debe ser un número >= 0");
    }

    if (precioNum < costoNum) {
        return errorResponse(res, 400, "El precio no puede ser menor que el costo");
    }

    const datos = { descripcion, unidad, costo: costoNum, precio: precioNum };

    try {
        const result = await ProductoModel.create(datos);
        return res.status(201).json({ 
            codigo: result.insertId, 
            ...datos 
        });
    } catch (error) {
        console.error("Error en create producto:", error);
        return errorResponse(res, 500, "Error interno del servidor");
    }
};

export const updateById = async (req, res) => {
    const { id } = req.params;
    const { descripcion, unidad, costo, precio } = req.body ?? {};

    if (!id || isNaN(Number(id))) {
        return errorResponse(res, 400, "Código inválido");
    }
    if (!descripcion || !unidad || costo === undefined || precio === undefined) {
        return errorResponse(res, 400, "Faltan datos obligatorios");
    }

    if (!UNIDADES_PERMITIDAS.includes(unidad)) {
        return errorResponse(res, 400, `Unidad inválida. Permitidas: ${UNIDADES_PERMITIDAS.join(", ")}`);
    }

    const costoNum = Number(costo);
    const precioNum = Number(precio);

    if (isNaN(costoNum) || costoNum < 0) {
        return errorResponse(res, 400, "Costo debe ser un número >= 0");
    }
    if (isNaN(precioNum) || precioNum < 0) {
        return errorResponse(res, 400, "Precio debe ser un número >= 0");
    }

    if (precioNum < costoNum) {
        return errorResponse(res, 400, "El precio no puede ser menor que el costo");
    }

    const datos = { descripcion, unidad, costo: costoNum, precio: precioNum };

    try {
        const actualizado = await ProductoModel.updateById(Number(id), datos);
        if (!actualizado) {
            return errorResponse(res, 404, "Producto no encontrado");
        }
        return res.status(200).json({ mensaje: "Producto actualizado correctamente" });
    } catch (error) {
        console.error("Error en update producto:", error);
        return errorResponse(res, 500, "Error interno del servidor");
    }
};

export const deleteById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id || isNaN(Number(id))) {
            return errorResponse(res, 400, "Código inválido");
        }

        const eliminado = await ProductoModel.deleteById(Number(id));
        if (!eliminado) {
            return errorResponse(res, 404, "Producto no encontrado");
        }
        return res.status(204).send();
    } catch (e) {
        console.error("Error en delete producto:", e);
        return errorResponse(res, 500, "Error interno del servidor");
    }
};