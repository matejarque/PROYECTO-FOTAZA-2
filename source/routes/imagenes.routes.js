import { registrarImagenAPublicacionController, listarImagenesPorPublicacionController} from "../controllers/imagenes.controller.js";
import express from "express";

const router = express.Router();


router.post("/registrar-imagen", registrarImagenAPublicacionController);//funciona
router.get("/listar-imagenes-por-publicacion/:idPublicacion", listarImagenesPorPublicacionController);//funciona

export default router;