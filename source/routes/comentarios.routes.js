import express from 'express';
import { crearComentarioController, listarComentariosPorPublicacionController, editarComentarioController, modificarEstadoComentariosController, comentarioReportadoController, eliminarComentarioController, listarComentariosReportadosPorUsuarioController } from '../controllers/comentarios.controller.js';
const router = express.Router();

//tengo que probar todas las rutas de nuevo
router.post("/crear", crearComentarioController); //funciona
router.get("/publicacion/:idPublicacion", listarComentariosPorPublicacionController);//funciona
router.put("/editar/:idComentario", editarComentarioController);//funciono a la primera insano
router.put("/modificar-apertura", modificarEstadoComentariosController);
router.put("/eliminar/:idComentario", eliminarComentarioController);//funciono a la primera
router.put("/reportar/:idComentario", comentarioReportadoController);//funciona, pero me di cuenta que muchos usuarios pueden reportar un comentario, estohay que manejarlo con otra tabla
router.get("/reportados/:idUsuario", listarComentariosReportadosPorUsuarioController);//-> hay que acerlo en otra tabla


export default router;