import {
comentarioReportadoModel,
crearComentarioModel,
editarComentarioModel,
eliminarComentarioModel,
listarComentariosReportadosPorUsuarioModel, listarComentariosPorPublicacionModel } from '../models/comentarios.model.js';



export const crearComentarioController = async (req, res) => {
    try {

        const { comentario, idUsuario, idPublicacion } = req.body;

        if (!comentario || !idUsuario || !idPublicacion) {
            return res.status(400).json({mensaje: "faltan datos para crear el comentario"});
        }

        const resultado = await crearComentarioModel(comentario, idUsuario, idPublicacion);

        return res.status(200).json({mensaje: "comentario creado correctamente", data: resultado});

    } catch (error) {

        console.log("error crearComentarioController", error);
        return res.status(500).json({mensaje: "error en el servidor crearComentarioController"});

    }
};



export const editarComentarioController = async (req, res) => {
    try {

        const { idComentario } = req.params;
        const { modificacion } = req.body;

        const resultado = await editarComentarioModel(idComentario, modificacion);

        return res.status(200).json({mensaje: "comentario actualizado", data: resultado});

    } catch (error) {

        console.log("error editarComentarioController", error);
        return res.status(500).json({mensaje: "error en el servidor editarComentarioController"});
    }
};



export const comentarioReportadoController = async (req, res) => {
    try {

        const { idComentario } = req.params;
        const resultado = await comentarioReportadoModel(idComentario);

        return res.status(200).json({mensaje: "comentario reportado",data: resultado});

    } catch (error) {

        console.log("error comentarioReportadoController", error);
        return res.status(500).json({mensaje: "error en el servidor comentarioReportadoController"});

    }
};



export const eliminarComentarioController = async (req, res) => {
    try {

        const { idComentario } = req.params;

        const resultado = await eliminarComentarioModel(idComentario);
        return res.status(200).json({mensaje: "comentario eliminado", data: resultado});

    } catch (error) {

        console.log("error en eliminarComentarioController", error);

        return res.status(500).json({mensaje: "error en el servidor eliminarComentarioController"});

    }
};



export const listarComentariosPorPublicacionController = async (req, res) => {
    try {

        const { idPublicacion } = req.params;

        if(!idPublicacion){
            return res.status(404).json({mensaje: "faltan datos"});
        }
        const resultado = await listarComentariosPorPublicacionModel(idPublicacion);
        return res.status(200).json({mensaje: "comentarios encontrados", data: resultado});

    } catch (error) {

        console.log("error listarComentariosPorPublicacionController", error);
        return res.status(500).json({mensaje: "error en el servidor listarComentariosPorPublicacionController"});

    }
};



export const listarComentariosReportadosPorUsuarioController = async (req, res) => {
    try {

        const { idUsuario } = req.params;

        const resultado = await listarComentariosReportadosPorUsuarioModel(idUsuario);

        return res.status(200).json({mensaje: "comentarios reportados encontrados", data: resultado});

    } catch (error) {

        console.log("error listarComentariosReportadosPorUsuarioController", error);
        return res.status(500).json({mensaje: "error en el servidor listarComentariosReportadosPorUsuarioController"});
    }
};