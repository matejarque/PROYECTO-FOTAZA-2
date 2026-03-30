import express from 'express';
import {seguirController, dejarDeSeguirController, contarSeguidoresController} from '../controllers/seguidor.controller.js';
const router = express.Router();

router.post("/seguir", seguirController);
router.put("/dejar-seguir", dejarDeSeguirController);
router.get("/contar/:id_usuario", contarSeguidoresController);

export default router;