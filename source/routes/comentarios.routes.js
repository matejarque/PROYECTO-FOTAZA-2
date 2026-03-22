import express from 'express';
import { crearComentarioController, listarComentariosPorPublicacionController, editarComentarioController, comentarioReportadoController, eliminarComentarioController, listarComentariosReportadosPorUsuarioController } from '../controllers/comentarios.controller';
const router = express.Router();

router.post("/crear", crearComentarioController); //probar
router.get("/publicacion/:idPublicacion", listarComentariosPorPublicacionController);//probar
router.put("/editar/:idComentario", editarComentarioController);//probar
router.put("/eliminar/:idComentario", eliminarComentarioController);//probar
router.put("/reportar/:idComentario", comentarioReportadoController);//probar
router.get("/reportados/:idUsuario", listarComentariosReportadosPorUsuarioController);//probar


export default router;