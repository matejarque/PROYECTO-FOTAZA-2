import express from "express";
import multer from "multer";

import{ crearPublicacionController, eliminarPublicacionController,
     editarPublicacionController, obtenerPublicacionPorIdController, 
     listarPublicacionesController, obtenerTodasLasPublicacionesController, 
     validarYBajarPublicacionController, publicacionesDeUsuariosSeguidosController} from "../controllers/publicaciones.controller.js";
     
import {esUsuarioRegistrado} from "../middlewares/auth.middleware.js"

import { upload } from "../middlewares/multer.middleware.js";

const router = express.Router();


router.post("/crear", esUsuarioRegistrado, upload.array("imagenes"), crearPublicacionController);//funciona
router.get("/obtener/:id_publicacion", obtenerPublicacionPorIdController);//funciona
router.get("/listar-todas", listarPublicacionesController); //funciona
router.get("/obtener-todas", obtenerTodasLasPublicacionesController)//funciona -> trae todas las publicaciones de todo lo usuarios
router.put("/editar/:idPublicacion/:idUsuario", esUsuarioRegistrado, editarPublicacionController);//funciona
router.put("/eliminar/:id", esUsuarioRegistrado, eliminarPublicacionController);//Agregar usuario y pasarlo por session

//estos aun no puedo probar
router.put("/validarYbajarPublicacion", validarYBajarPublicacionController);
router.get("/publicaciones-de-seguidos", publicacionesDeUsuariosSeguidosController);


export default router;
