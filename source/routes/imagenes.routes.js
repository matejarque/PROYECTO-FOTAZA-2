import { registrarImagenAPublicacionController, listarImagenesPorPublicacionController} from "../controllers/imagenes.controller.js";
import express from "express";

const router = express.Router();


router.post("/registrar-imagen", registrarImagenAPublicacionController);
router.get("/listar-imagenes-por-publicacion/:idPublicacion", listarImagenesPorPublicacionController);

export default router;