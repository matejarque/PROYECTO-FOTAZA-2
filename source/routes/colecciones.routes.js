import {crearColeccionController, cambiarEstadoPublicoOPrivadoController, agregarPublicacionAColeccionController, 
     listarColeccionesUsuarioController, obtenerPublicacionesDeColeccionController} from "../controllers/colecciones.controller.js";
import expres from "express";
import { esUsuarioRegistrado } from "../middlewares/auth.middleware.js";
const routes = expres.Router();
//funcionan
routes.post("/", esUsuarioRegistrado,crearColeccionController);
routes.get("/usuario/:id_usuario", esUsuarioRegistrado,listarColeccionesUsuarioController); 
routes.get("/:id_coleccion/publicaciones", esUsuarioRegistrado,obtenerPublicacionesDeColeccionController); 
routes.put("/estado", esUsuarioRegistrado,cambiarEstadoPublicoOPrivadoController);

//requiere modificaciones si o si
routes.post("/agregar-publicacion-coleccion", agregarPublicacionAColeccionController);




export default routes;