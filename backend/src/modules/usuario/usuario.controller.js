import { UserModel } from "./usuario.model.js";

export const getAll = async (req, res) => {
    try {
        res.json(await UserModel.getAll())
    }
    catch (e) {
        res.status(500).json({
            'Error': e.message
        })
    }
}
//
export const getById = async (req, res) => {
    try {
        const { id } = req.params
        if (!id || isNaN(id)) return res.status(400).json({ 'Error': 'Faltan parametros' })

        const rpt = await UserModel.getById(id)
        return rpt !== null ?
            res.status(200).json(rpt) :
            res.status(404).json({ 'Error': 'No se encontró al usuario' })

    } catch (e) {
        return res.status(500).json({ 'Error': e.message })
    }
}
export const deleteById = async (req, res) => {
    try {
        const { id } = req.params;
        const rpst = await UserModel.deleteById(id)
        if (!id) return res.status(400).json({ error: 'Faltan datos' });
        if (!rpst) return res.status(404).json({ error: 'User not found' });
        return res.status(204).json({ resultado: rpst });

    } catch (e) {
        res.status(500).json({
            'Error': e.message
        })

    }
}
export const create = async (req, res) => {
    const { nombre, apellidos, email,
        telefono, ciudad, estado,
        password } = req.body ?? {}

    if (!nombre || !apellidos || !email ||
        !telefono || !ciudad || !estado || !password)
        return res.status(400).json({ 'Error': 'Faltan datos' })

    // validaciones simples : email y password 
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!regexEmail.test(email))
        return res.status(400).json({ 'Error': 'El email no es valido' })
    if (password.length < 6)
        return res.status(400).json({ 'Error': 'El password debe tener minimo 6 caracteres' })

    const datos = { nombre, apellidos, email, telefono, ciudad, estado, password };

    try {
        const results = await UserModel.create(datos);
        return res.status(201).json({ results });
    } catch (error) {
        return res.status(500).json({
            error: `ocurrió un error en la insercion:${error}`,
        });
    }
};
export const updateById = async (req, res) => {
    const { id } = req.params
    const { nombre, apellidos, email,
        telefono, ciudad, estado,
        password } = req.body ?? {}

    try {
        if (!id || isNaN(id)) return res.status(400).json({ 'Error': 'Faltan parametros' })
        if (!nombre || !apellidos || !email ||
            !telefono || !ciudad || !estado || !password)
            return res.status(400).json({ 'Error': 'Faltan datos' })

        // validaciones simples : email y password 
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!regexEmail.test(email))
            return res.status(400).json({ 'Error': 'El email no es valido' })
        if (password.length < 6)
            return res.status(400).json({ 'Error': 'El password debe tener minimo 6 caracteres' })

        const rpt = await UserModel.updateById(id, req.body)
        return rpt ?
            res.status(200).json({ resultado: rpt }) :
            res.status(404).json({ 'Error': 'No se encontró al usuario' })

    } catch (e) {
        return res.status(500).json({ 'Error': e.message })
    }
}
