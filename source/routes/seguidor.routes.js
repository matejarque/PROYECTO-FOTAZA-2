import express from 'express';
import {seguirController, dejarDeSeguirController, contarSeguidoresController} from '../controllers/seguidor.controller.js';
const router = express.Router();

router.post("/seguir", seguirController);//funciona
router.delete("/dejar-seguir", dejarDeSeguirController);//funciona
router.get("/contar/:id_usuario", contarSeguidoresController);//funciona

export default router;