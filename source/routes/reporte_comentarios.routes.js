import express from "express";
const router = express.Router();
import {reporte_comentarios_comentarioMasReportadoController, 
    reporte_comentarios_contadorDeReporteController, 
    reporte_comentarios_reporteComentarioController, reporte_comentarios_verificarReporteExistenteController} from '../controllers/reporte_comentarios.controller.js';


router.get("/", (req,res)=>{
    res.json({mensaje:"router de reportes funcionando"});
});


router.get("/mas-reportado", reporte_comentarios_comentarioMasReportadoController);
router.post("/crear-reporte", reporte_comentarios_reporteComentarioController);
router.get("/contar-reportes/:idComentario", reporte_comentarios_contadorDeReporteController)
router.get("/verificar", reporte_comentarios_verificarReporteExistenteController);


export default router;