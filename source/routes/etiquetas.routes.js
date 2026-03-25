import express from 'express';
const router = express.Router();
import {buscarOCrearEtiquetaController, listarEtiquetasPopularesController} from '../controllers/etiquetas.controller.js'


router.post("/buscar-crear", buscarOCrearEtiquetaController);//funciona
router.get("/listar", listarEtiquetasPopularesController);//funciona



export default router;