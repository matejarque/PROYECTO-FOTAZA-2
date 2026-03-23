import express from "express";

import {reporte_comentarios_comentarioMasReportadoController, 
    reporte_comentarios_contadorDeReporteController, 
    reporte_comentarios_reporteComentarioController} from '../controllers/reporte_comentarios.controller.js';


const router = express.Router();


router.get("/mas-reportado", reporte_comentarios_comentarioMasReportadoController);
router.post("/crear-reporte", reporte_comentarios_reporteComentarioController);
router.get("/contar-reportes", reporte_comentarios_contadorDeReporteController)



export default router;