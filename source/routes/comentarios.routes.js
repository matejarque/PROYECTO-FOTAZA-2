import express from 'express';
import { crearComentarioController,
     listarComentariosPorPublicacionController,
      editarComentarioController, modificarEstadoComentariosController, 
       eliminarComentarioController, listarComentariosReportadosPorUsuarioController } from '../controllers/comentarios.controller.js';
const router = express.Router();
import { esUsuarioRegistrado } from '../middlewares/auth.middleware.js';

//Rutas funcionando
router.post("/crear/:idUsuario", esUsuarioRegistrado, crearComentarioController); //funciona
router.get("/publicacion/:idPublicacion", listarComentariosPorPublicacionController);//funciona
router.put("/editar/:idComentario/:idUsuario", esUsuarioRegistrado, editarComentarioController);//debo quitar idUsuario porque lo sacare de .session

router.put("/modificar-apertura/:idPublicacion/:idUsuario", esUsuarioRegistrado, modificarEstadoComentariosController);//este es para cerrar los comentarios de publicacion, deberia de colocarlo en publicacion?

router.put("/eliminar/:idComentario", esUsuarioRegistrado, eliminarComentarioController);//funciono a la primera
//router.put("/reportar/:idComentario", comentarioReportadoController);//funciona, pero me di cuenta que muchos usuarios pueden reportar un comentario, estohay que manejarlo con otra tabla
router.get("/reportados/:idUsuario", listarComentariosReportadosPorUsuarioController);//-> hay que acerlo en otra tabla


export default router;