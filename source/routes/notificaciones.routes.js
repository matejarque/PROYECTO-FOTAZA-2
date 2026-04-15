import {crearNotificacionController, obtenerNotificacionesUsuarioController, marcarLeidaController} from "../controllers/notificaciones.controller.js";
import express from "express";
import {esUsuarioRegistrado} from "../middlewares/auth.middleware.js"
const router = express.Router();
//funcionan
router.post("/", esUsuarioRegistrado, crearNotificacionController);
router.get("/", obtenerNotificacionesUsuarioController);

//modificar, luego hay que quitar el idUsuario
router.put("/visto/:idNotificacion/:id_usuario_destino", marcarLeidaController);

export default router;
