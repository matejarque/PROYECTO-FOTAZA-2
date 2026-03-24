import { 
    reporte_comentarios_contadorDeReportesModel, 
    reporte_comentarios_reporteComentarioModel, 
    reporte_comentarios_comentarioMasReportadoModel, 
    reporte_comentarios_verificarReporteExistenteModel } from '../models/reporte_comentarios.model.js';

export const reporte_comentarios_comentarioMasReportadoController = async(req, res)=>{
    try {
        const resultado = await reporte_comentarios_comentarioMasReportadoModel();
        return res.status(200).json({mensaje: "comentario creado correctamente", data: resultado});
    } catch (error) {
        console.log("error en report_comentarios_comentarioMasReportadoController");

    }
}
export const reporte_comentarios_verificarReporteExistenteController = async (req, res) => {
    try {

        const { idComentario, idUsuario } = req.query;

        const resultado = await reporte_comentarios_verificarReporteExistenteModel(idComentario, idUsuario);

        return res.status(200).json({existe: resultado.length > 0});

    } catch (error) {

        console.log("error en verificarReporteExistenteController", error);
        return res.status(500).json({mensaje: "error en el servidor"});
     }
};

export const reporte_comentarios_contadorDeReporteController = async(req, res)=>{
    try {

        const {idComentario} = req.params;
        const [resultado] = await reporte_comentarios_contadorDeReportesModel(idComentario);
        return res.status(200).json({mensaje: "comentarios contados", data: resultado});
        
    } catch (error) {
        console.log("error en reporte_comentarios_contadorDeReporteController", error);
        return res.status(500).json({mensaje: "error en el servidor crearComentarioController"});
    }
}


export const reporte_comentarios_reporteComentarioController = async (req, res) => {
    try {

        const { idComentario, idUsuario, motivo } = req.body;

        if (!idComentario || !idUsuario || !motivo) {
            return res.status(400).json({mensaje: "faltan datos para reportar el comentario"});
        }

        const reporteExistente = await reporte_comentarios_verificarReporteExistenteModel(idComentario, idUsuario);

        if (reporteExistente.length > 0) {
            return res.status(400).json({mensaje: "este usuario ya reporto este comentario"});
        }

        const resultado = await reporte_comentarios_reporteComentarioModel(idComentario, idUsuario, motivo);
        return res.status(201).json({mensaje: "comentario reportado correctamente",data: resultado});

    } catch (error) {

        console.log("error en reporte_comentarios_reporteComentarioController", error);
        return res.status(500).json({mensaje: "error en el servidor"});

    }
};