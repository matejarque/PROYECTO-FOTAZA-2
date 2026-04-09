import {crearColeccionController, cambiarEstadoPublicoOPrivadoController, agregarPublicacionAColeccionController, 
     listarColeccionesUsuarioController, obtenerPublicacionesDeColeccionController} from "../controllers/colecciones.controller.js";
import expres from "express";
const routes = expres.Router();
//funcionan
routes.post("/", crearColeccionController);
routes.get("/usuario/:id_usuario", listarColeccionesUsuarioController); 
routes.get("/:id_coleccion/publicaciones", obtenerPublicacionesDeColeccionController); 
routes.put("/estado", cambiarEstadoPublicoOPrivadoController);

//requiere modificaciones si o si
routes.post("/agregar-publicacion-coleccion", agregarPublicacionAColeccionController);




export default routes;