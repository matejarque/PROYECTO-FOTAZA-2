import {crearNotificacionController, obtenerNotificacionesUsuarioController, marcarLeidaController} from "../controllers/notificaciones.controller.js";
import express from "express";
const router = express.Router();

router.post("/", crearNotificacionController);
router.get("/", obtenerNotificacionesUsuarioController);
router.put("/", marcarLeidaController);

export default router;
