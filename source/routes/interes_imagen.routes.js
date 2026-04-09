import {generarInteresImagenController, eliminarInteresImagenController, traerInteresImagenController} from "../controllers/interes_imagen.controller.js";
import express from "express";

const router = express.Router();

//funcionan pero requieren modificaciones
router.post("/", generarInteresImagenController);
router.delete("/eliminar", eliminarInteresImagenController);
router.get("/listar/:id_usuario_interesado", traerInteresImagenController);



export default router;