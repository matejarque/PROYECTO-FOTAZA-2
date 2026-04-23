import express from 'express';
const router = express.Router();
import {buscarOCrearEtiquetaController, listarEtiquetasPopularesController} from '../controllers/etiquetas.controller.js'
import { esUsuarioRegistrado } from '../middlewares/auth.middleware.js';

router.post("/buscar-crear", esUsuarioRegistrado,buscarOCrearEtiquetaController);//funciona
router.get("/listar", listarEtiquetasPopularesController);//funciona



export default router;