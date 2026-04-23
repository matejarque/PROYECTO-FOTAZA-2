import {registrarValoracionController, sacarPromedioValoracionesController} from "../controllers/valoraciones.controller.js";
import express from "express";
import { esUsuarioRegistrado } from "../middlewares/auth.middleware.js";
const router = express.Router();

//funcionan
router.post("/valorar/:idUsuario", esUsuarioRegistrado, registrarValoracionController);//funciona
router.get("/promediar/:idImagen", sacarPromedioValoracionesController);//funciona


export default router;