import express from "express";
import{ crearPublicacionController, eliminarPublicacionController,
     editarPublicacionController, obtenerPublicacionPorIdController, 
     listarPublicacionesController, obtenerTodasLasPublicacionesController} from "../controllers/publicaciones.controller.js";

const router = express.Router();


router.post("/crear", crearPublicacionController);//funciona
router.get("/obtener/id", obtenerPublicacionPorIdController);//funciona
router.put("/actualizar/:id", editarPublicacionController);//funciona
router.put("/eliminar/:id", eliminarPublicacionController);//funciona
router.get("/listar/todas", listarPublicacionesController); //funciona
router.get("/obener/todas", obtenerTodasLasPublicacionesController)//funciona -> trae todas las publicaciones de todo lo usuarios


export default router;
