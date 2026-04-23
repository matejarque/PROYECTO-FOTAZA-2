import {generarInteresImagenController, eliminarInteresImagenController, traerInteresImagenController} from "../controllers/interes_imagen.controller.js";
import express from "express";
import {esUsuarioRegistrado} from "../middlewares/auth.middleware.js";
const router = express.Router();

//funcionan pero requieren modificaciones
router.post("/", esUsuarioRegistrado, generarInteresImagenController);
router.delete("/eliminar", esUsuarioRegistrado,eliminarInteresImagenController);
router.get("/listar/:id_usuario_interesado", esUsuarioRegistrado,traerInteresImagenController);



export default router;