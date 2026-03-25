import express from "express";
const router = express.Router();
import {reporte_comentarios_comentarioMasReportadoController, 
    reporte_comentarios_contadorDeReporteController, 
    reporte_comentarios_reporteComentarioController, reporte_comentarios_verificarReporteExistenteController} from '../controllers/reporte_comentarios.controller.js';


router.get("/", (req,res)=>{
    res.json({mensaje:"router de reportes funcionando"});
});

//resulta que el problema era en postman, las rutas estaban bien. 
router.get("/mas-reportado", reporte_comentarios_comentarioMasReportadoController);//funciona
router.post("/crear-reporte", reporte_comentarios_reporteComentarioController);//funciona
router.get("/contar-reportes/:idComentario", reporte_comentarios_contadorDeReporteController)//funciona
router.get("/verificar", reporte_comentarios_verificarReporteExistenteController);//funciona
/**
 * podria agregar para que sea mas automatica el tema reporte:
 * -cada vez que se reporte llamar a una funion/endpoint que actualice la cantidad de reportes, pero debo agregar algo en la base de datos para llevar el contadr?
 */

export default router;