import express from 'express';
import {seguirController, dejarDeSeguirController, contarSeguidoresController} from '../controllers/seguidor.controller.js';
const router = express.Router();
import { esUsuarioRegistrado } from '../middlewares/auth.middleware.js';
///funcionan todos
router.post("/seguir", esUsuarioRegistrado, seguirController);//funciona
router.delete("/dejar-seguir", esUsuarioRegistrado, dejarDeSeguirController);//funciona
router.get("/contar/:id_usuario", contarSeguidoresController);//funciona

export default router;