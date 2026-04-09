//crearNotificacionModel - obtenerNotificacionesUsuarioModel - marcarLeidaModel
import {crearNotificacionModel, obtenerNotificacionesUsuarioModel, marcarLeidaModel} from "../models/notificaciones.model.js";

export const crearNotificacionController = async (req, res) => {
    try {
        //const {idOrigen} = req.session;
        const {id_usuario_destino, id_usuario_origen, tipo_evento, tipo_recurso, id_recurso, leido} = req.body;

        if (!id_usuario_destino || !id_usuario_origen || !tipo_evento) {
            return res.status(400).json({ mensaje: "Faltan datos obligatorios para la notificación" });
        }

        const resultado = await crearNotificacionModel(id_usuario_destino, id_usuario_origen, tipo_evento, tipo_recurso, id_recurso, leido);
        return res.status(200).json({mensaje: "notifiacion creada con exito",id: resultado.insertId});
    } catch (error) {
        console.error("Error en crearNotificacionController:", error);
        return res.status(500).json({ mensaje: "Error interno al crear notificacion"});
    }
};


export const obtenerNotificacionesUsuarioController = async (req, res) => {
    try {
        //const {id_usuario_origen} = req.session;
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
        const { idNotificacion, id_usuario_destino } = req.params;

        const resultado = await marcarLeidaModel(idNotificacion, id_usuario_destino);

        if (resultado.affectedRows === 0) {
            return res.status(404).json({ mensaje: "Notificación no encontrada" });
        }

        return res.status(200).json({ mensaje: "Notificaciion leida" });
    } catch (error) {
        console.error("Error en marcarLeidaController:", error);
        return res.status(500).json({ mensaje: "Error al actualizar notificación" });
    }
};