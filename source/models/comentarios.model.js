import db from '../config/db.js';

/**
 * 
id_comentario
contenido
fecha_creacion
estado
id_usuario
id_publicacion
 */
export const crearComentarioModel = async (comentario, idUsuario, idPublicacion) => {
    try {
         const query = `INSERT INTO comentarios (contenido, id_usuario, id_publicacion)VALUES (?, ?, ?)`;

        const [resultado] = await db.query(query, [comentario, idUsuario, idPublicacion]);
        return resultado;
    } catch (error) {
        console.log("error en crearComentarioModel", error);
        throw error;
    }
}
export const listarComentariosPorPublicacionModel = async(idPublicacion) => {
    try {
        const query = `SELECT c.id_comentario, c.contenido, c.fecha_creacion, u.nombre_usuario 
            FROM comentarios c
            JOIN usuarios u ON c.id_usuario = u.id_usuario
            WHERE c.id_publicacion = ? AND c.estado IN ('visible', 'reportado') ORDER BY c.fecha_creacion DESC`;
        const [resultado] = await db.query(query, [idPublicacion]);
        return resultado;

    } catch (error) {
        console.log("error en listarComentariosPorPublicacion", error);
        throw error;
    }
}

export const eliminarComentarioModel = async (idComentario) => {
    try {
        const query = `UPDATE comentarios SET estado = ? WHERE id_comentario = ?`;
        const [resultado] = await db.query(query, ['eliminado', idComentario]);
        return resultado;

    } catch (error) {
        console.log("error en EliminarComentarioModel", error);
        throw error;
    }
}

export const comentarioReportadoModel = async (idComentario) => {
     try {
        const query = `UPDATE comentarios SET estado = ? WHERE id_comentario = ?`;
        const [resultado] = await db.query(query, ['reportado',idComentario]);
        return resultado;

    } catch (error) {
        console.log("error en comentarioReportadoModel", error);
        throw error;
    }
}



export const editarComentarioModel = async (idComentario, modificacion) => {
    try {
        const query = `UPDATE comentarios SET contenido = ? WHERE id_comentario = ?`;
        const [resultado] = await db.query(query, [modificacion, idComentario]);
        return resultado;

    } catch (error) {
        console.log("error en editarComentarioModel", error);
        throw error;
    }
}


export const listarComentariosReportadosPorUsuarioModel = async (idUsuario) => {
    try {
        const query = `SELECT * FROM comentarios WHERE estado = ? AND idUsuario = ?`;
        const [resultado] = await db.query(query, ['reportado', idUsuario]);
        return resultado;
    } catch (error) {
        console.log("Error en listarComentariosReportadosPorUsuarioModel");
        throw error;
    }
}