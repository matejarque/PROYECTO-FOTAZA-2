import {registrarValoracionController, sacarPromedioValoracionesController} from "../controllers/valoraciones.controller.js";
import express from "express";
const router = express.Router();


router.post("/valorar", registrarValoracionController);//funciona
router.get("/promediar/:idImagen", sacarPromedioValoracionesController);//funciona


export default router;