import { Router } from "express";
import * as usuario from "./usuario.controller.js";

const router = Router();

router.get(`/usuario`, usuario.getAll);
router.get(`/usuario/:id`, usuario.getById)
router.post(`/usuario`, usuario.create)
router.put(`/usuario/:id`, usuario.updateById)
router.delete(`/usuario/:id`, usuario.deleteById)

export default router;