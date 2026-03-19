import express from "express";
import { crearUsuarioController, editarUsuarioController, suspenderUsuarioController, crearModeradorController,
     buscarUsuarioPorNombreController, buscarUsuarioPorEmailController} 
from "../controllers/usuario.controller.js";

const router = express.Router();

router.post("/usuario/registrar", crearUsuarioController); //funciona perfecto
router.put("/usuario/actualizar-datos", editarUsuarioController);//funciona perfecto
router.put("/usuario/suspender", suspenderUsuarioController);//Funciona perfecto
router.put("/usuario/crear/moderador", crearModeradorController);//Funciona perfecto
router.get("/usuario/buscar/:nombre", buscarUsuarioPorNombreController);//probar
router.get("/usuario/buscar/email", buscarUsuarioPorEmailController);//probar

export default router;