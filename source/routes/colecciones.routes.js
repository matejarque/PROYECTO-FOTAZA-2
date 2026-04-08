import {crearColeccionController, cambiarEstadoPublicoOPrivadoController, agregarPublicacionAColeccionController, 
     listarColeccionesUsuarioController, obtenerPublicacionesDeColeccionController} from "../controllers/colecciones.controller.js";
import expres from "express";
const routes = expres.Router();


routes.get("/usuario/:id_usuario", listarColeccionesUsuarioController); 
routes.get("/:id_coleccion/publicaciones", obtenerPublicacionesDeColeccionController); 
routes.post("/", crearColeccionController);
routes.put("/estado", cambiarEstadoPublicoOPrivadoController);
routes.post("/agregar-publicacion-coleccion", agregarPublicacionAColeccionController);





export default routes;