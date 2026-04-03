import express from "express";
import{ crearPublicacionController, eliminarPublicacionController,
     editarPublicacionController, obtenerPublicacionPorIdController, 
     listarPublicacionesController, obtenerTodasLasPublicacionesController} from "../controllers/publicaciones.controller.js";

const router = express.Router();


router.post("/", crearPublicacionController);//funciona
router.get("/:id", obtenerPublicacionPorIdController);//funciona
router.get("/", listarPublicacionesController); //funciona
router.get("/obener-todas", obtenerTodasLasPublicacionesController)//funciona -> trae todas las publicaciones de todo lo usuarios
router.put("/:id", editarPublicacionController);//funciona
router.put("/:id", eliminarPublicacionController);//funciona


export default router;
