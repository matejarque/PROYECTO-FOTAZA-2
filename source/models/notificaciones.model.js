import db from "../config/db.js";
//crearNotificacionModel - obtenerNotificacionesUsuarioModel - marcarLeidaModel
//id_usuario_destino, id_usuario_origen, tipo_evento, tipo_recurso, id_recurso, leido
export const crearNotificacionModel = async (id_usuario_destino, id_usuario_origen, tipo_evento, tipo_recurso, id_recurso, leido) => {
    try {
        const query = `INSERT INTO (id_usuario_destino, id_usuario_origen, tipo_evento, tipo_recurso, id_recurso, leido)
        FROM notificaciones VALUES (?, ?, ?, ?, ?, ?)`;
        const [resultado] = await db.query(query, [id_usuario_destino, id_usuario_origen, tipo_evento, tipo_recurso, id_recurso, leido]);
        return resultado;
    } catch (error) {
        console.log("error en crearNotificacionModel", error);
        throw error;
    }
}

export const obtenerNotificacionesUsuarioModel = async (idUsuario) => {
    try {
        const query = `SELECT n.*, u.nombre_usuario as usuario_accion 
        FROM notificaciones n
        JOIN usuarios u ON n.id_usuario_origen = u.id_usuario
        WHERE n.id_usuario_destino = ? 
        ORDER BY n.fecha DESC`;
        const [resultado] = await db.query(query, [idUsuario]);
        return resultado;
    } catch (error) {
        console.log("Error en ObtenerNotificacionesUsuarioModel", error);
        throw error;
    }
}


export const marcarLeidaModel = async (idNotificacion) => {
    const query = `UPDATE notificaciones SET leido = 1 WHERE id_notificacion = ?`;
    await db.query(query, [idNotificacion]);
};



//eliminar notificaciones?

export const eliminarNotificaciones = async (idNotificacion) => {
    const query = `DELETE FROM notificaciones WHERE id_notificacion = ?`;
    await db.query(query, [idNotificacion]);
};