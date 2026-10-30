import { Router } from "express";
import * as producto from "./producto.controller.js";

const router = Router();

router.get("/producto", producto.getAll);
router.get("/producto/:id", producto.getById);
router.get("/producto/codigo/:codigo", producto.getByCodigo);
router.post("/producto", producto.create);
router.put("/producto/:id", producto.updateById);
router.delete("/producto/:id", producto.deleteById);

export default router;