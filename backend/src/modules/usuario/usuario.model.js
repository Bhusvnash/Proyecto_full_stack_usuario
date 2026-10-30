import db from '../../config/dbconnection.js';
import bcrypt from 'bcryptjs'
/**
 * @description obj.funciones que responde a tbl_usuario
 */
export const UserModel = {

    getAll: async () => {
        const sql = "SELECT * From usuario ORDER By apellidos"
        const [rows] = await db.query(sql);
        return rows;

    },
    getById: async (id) => {
        const sql = "SELECT * From usuario where id_usuario = ?";
        const [rows] = await db.query(sql, [id]);
        return rows ?? null;
    },
    deleteById: async (id) => {
        const sql = "Delete FROM usuario where id_usuario = ?"
        const [result] = await db.query(sql, [id])
        return result.affectedRows > 0;
    },
    create: async (data) => {
        let email = data.email;
        console.log(data);
        // validamos que el email no exista ! , el usuario lo validaremos por el
        email
        const [emailExiste] = await db.query(
            "SELECT * FROM usuario WHERE email = ?",
            [email],
        );
        if (emailExiste.length > 0) {
            throw new Error("El email ya está registrado");
        }
        const userNuevo = {
            nombre: data.nombre,
            apellidos: data.apellidos,
            email: data.email,
            telefono: data.telefono,
            ciudad: data.ciudad,
            estado: data.estado,
            password: bcrypt.hashSync(data.password, 11), // Encriptar la
        };
        const sql = "INSERT INTO usuario SET ?";
        const [rows] = await db.query(sql, [userNuevo]);
        return rows;
    },
    updateById: async (id, usuario) => {
        const sql = `UPDATE usuario SET 
        nombre = :nombre, apellidos = :apellidos, email = :email, telefono = :telefono,
        ciudad = :ciudad, estado = :estado, password = :password
        WHERE id_usuario = :id`;
        //execute : 
        const [result] = await db.execute(sql, {
            id: id,
            nombre: usuario.nombre,
            apellidos: usuario.apellidos,
            email: usuario.email,
            telefono: usuario.telefono,
            ciudad: usuario.ciudad,
            estado: usuario.estado,
            password: bcrypt.hashSync(usuario.password, 11)
        });
        return result.affectedRows > 0;
    }
};