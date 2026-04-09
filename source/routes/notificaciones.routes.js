import {crearNotificacionController, obtenerNotificacionesUsuarioController, marcarLeidaController} from "../controllers/notificaciones.controller.js";
import express from "express";
const router = express.Router();
//funcionan
router.post("/", crearNotificacionController);
router.get("/", obtenerNotificacionesUsuarioController);

//modificar, luego hay que quitar el idUsuario
router.put("/visto/:idNotificacion/:id_usuario_destino", marcarLeidaController);

export default router;
