import express from "express";
import { crearUsuarioController, editarUsuarioController, suspenderUsuarioODarDeAltaController, crearModeradorController,
     buscarUsuarioPorNombreController, buscarUsuarioPorEmailController, cambiarContrasenaController, verificarDatosInicioSesionUsuarioController} 
from "../controllers/usuario.controller.js";
import { esUsuarioRegistrado } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = express.Router();
//funcionan todas las rutas
router.post("/registrar", upload.single("foto_perfil") ,crearUsuarioController); //funciona perfecto
router.put("/editar/:idUsuario", esUsuarioRegistrado, editarUsuarioController);//funciona perfecto
router.put("/estado", suspenderUsuarioODarDeAltaController);//Funciona perfecto
router.put("/crear-moderador", esUsuarioRegistrado, crearModeradorController);//Funciona perfecto
router.put("/actualizar-contrasena/:idUsuario", esUsuarioRegistrado, cambiarContrasenaController); //probar
router.get("/buscar-por-nombre/:nombre", esUsuarioRegistrado, buscarUsuarioPorNombreController);//funciona
router.get("/buscar-por-pais/:pais", esUsuarioRegistrado, buscarUsuarioPorEmailController);//busca por pais no por email
router.post("/verificar-inicio-sesion", verificarDatosInicioSesionUsuarioController);
export default router;