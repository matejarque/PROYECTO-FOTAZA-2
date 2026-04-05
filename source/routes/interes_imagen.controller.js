import {generarInteresImagenController, eliminarInteresImagenController, traerInteresImagenController} from "../controllers/interes_imagen.controller.js";
import express from "express";

const router = express.Router();

router.post("/", generarInteresImagenController);
router.delete("/eliminar", eliminarInteresImagenController);
router.get("/listar", traerInteresImagenController);



export default router;