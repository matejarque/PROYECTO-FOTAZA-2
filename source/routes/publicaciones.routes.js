import express from "express";
import{ crearPublicacionController, eliminarPublicacionController,
     editarPublicacionController, obtenerPublicacionPorIdController, 
     listarPublicacionesController, obtenerTodasLasPublicacionesController} from "../controllers/publicaciones.controller.js";

const router = express.Router();


router.post("/crear", crearPublicacionController);//funciona
router.get("/obtener/id", obtenerPublicacionPorIdController);//funciona
router.put("/actualizar", editarPublicacionController);//me falta
router.put("/eliminar/id", eliminarPublicacionController);//me falta termianrla
router.get("/listar/todas", listarPublicacionesController); //funciona
router.get("/obener/todas", obtenerTodasLasPublicacionesController)//funciona


export default router;
