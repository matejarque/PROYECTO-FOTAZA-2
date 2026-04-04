//crearNotificacionModel - obtenerNotificacionesUsuarioModel - marcarLeidaModel
import {crearNotificacionModel, obtenerNotificacionesUsuarioModel, marcarLeidaModel} from "../models/notificaciones.model.js";

export const crearNotificacionController = async (req, res) => {
    try {
        const { idDestino, idOrigen, tipoEvento, tipoRecurso, idRecurso } = req.body;

        if (!idDestino || !idOrigen || !tipoEvento) {
            return res.status(400).json({ mensaje: "Faltan datos obligatorios para la notificación" });
        }

        const resultado = await crearNotificacionModel(idDestino, idOrigen, tipoEvento, tipoRecurso, idRecurso);
        return res.status(200).json({mensaje: "Notificación creada con éxito",id: resultado.insertId});
    } catch (error) {
        console.error("Error en crearNotificacionController:", error);
        return res.status(500).json({ mensaje: "Error interno al crear notificación" });
    }
};


export const obtenerNotificacionesUsuarioController = async (req, res) => {
    try {
        const { idUsuario } = req.params; // truta -> /notificaciones/:idUsuario

        const notificaciones = await obtenerNotificacionesUsuarioModel(idUsuario);

        if (notificaciones.length === 0) {
            return res.status(200).json({ mensaje: "No tienes notificaciones nuevas", data: [] });
        }

        return res.status(200).json(notificaciones);
    } catch (error) {
        console.error("Error en obtenerNotificacionesUsuarioController:", error);
        return res.status(500).json({ mensaje: "Error al obtener notificaciones" });
    }
};


export const marcarLeidaController = async (req, res) => {
    try {
        const { idNotificacion } = req.params;

        const resultado = await marcarLeidaModel(idNotificacion);

        if (resultado.affectedRows === 0) {
            return res.status(404).json({ mensaje: "Notificación no encontrada" });
        }

        return res.status(200).json({ mensaje: "Notificación marcada como leída" });
    } catch (error) {
        console.error("Error en marcarLeidaController:", error);
        return res.status(500).json({ mensaje: "Error al actualizar notificación" });
    }
};