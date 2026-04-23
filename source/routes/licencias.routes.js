import {crearLicenciasController, traerLicenciasController} from "../controllers/licencias.controller.js";
import express from "express";
//no copyright - copyright
const routes = express.Router();
import { esUsuarioRegistrado } from "../middlewares/auth.middleware.js";
//funcionan->quitar-crear-licencias
routes.post('/crear-licencia', esUsuarioRegistrado, crearLicenciasController);//funciona
routes.get('/traer-licencias', traerLicenciasController);//funciona




export default routes;