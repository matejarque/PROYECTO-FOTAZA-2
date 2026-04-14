import express from "express";
import { crearUsuarioController, editarUsuarioController, suspenderUsuarioODarDeAltaController, crearModeradorController,
     buscarUsuarioPorNombreController, buscarUsuarioPorEmailController, cambiarContrasenaController, verificarDatosInicioSesionUsuarioController} 
from "../controllers/usuario.controller.js";


const router = express.Router();
//funcionan todas las rutas
router.post("/registrar", crearUsuarioController); //funciona perfecto
router.put("/editar/:idUsuario", editarUsuarioController);//funciona perfecto
router.put("/estado", suspenderUsuarioODarDeAltaController);//Funciona perfecto
router.put("/crear-moderador", crearModeradorController);//Funciona perfecto
router.put("/actualizar-contrasena/:idUsuario", cambiarContrasenaController); //probar
router.get("/buscar-por-nombre/:nombre", buscarUsuarioPorNombreController);//funciona
router.get("/buscar-por-pais/:pais", buscarUsuarioPorEmailController);//busca por pais no por email
router.get("/verificar-inicio-sesion", verificarDatosInicioSesionUsuarioController);

export default router;