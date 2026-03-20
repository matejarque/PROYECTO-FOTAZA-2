import express from "express";
import { crearUsuarioController, editarUsuarioController, suspenderUsuarioController, crearModeradorController,
     buscarUsuarioPorNombreController, buscarUsuarioPorEmailController, cambiarContrasenaController} 
from "../controllers/usuario.controller.js";
//import { cambiarContrasena } from "../models/usuario.model.js";

const router = express.Router();

router.post("/registrar", crearUsuarioController); //funciona perfecto
router.put("/actualizar-datos", editarUsuarioController);//funciona perfecto
router.put("/suspender", suspenderUsuarioController);//Funciona perfecto
router.put("/crear/moderador", crearModeradorController);//Funciona perfecto
router.put("/actualizar/contrasena/", cambiarContrasenaController); //probar
router.get("/buscar/:nombre", buscarUsuarioPorNombreController);//funciona
router.get("/buscar/email", buscarUsuarioPorEmailController);//probar

export default router;