import {registrarValoracionController, sacarPromedioValoracionesController} from "../controllers/valoraciones.controller.js";
import express from "express";
const router = express.Router();

//funcionan
router.post("/valorar/:idUsuario", registrarValoracionController);//funciona
router.get("/promediar/:idImagen", sacarPromedioValoracionesController);//funciona


export default router;