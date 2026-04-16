/**
 * id_publicacion
titulo
descripcion
visibilidad
contador_visualizaciones,
id_usuario
comentarios_abiertos
 */
import db from '../config/db.js';

//funciona, crea la publicacion base
export const crearPublicacionModel = async (titulo, descripcion, idUsuario) => {
    try {
        const query = `INSERT INTO publicaciones (titulo, descripcion, id_usuario) VALUES (?, ?, ?)`;
        const [resultado] = await db.query(query, [titulo, descripcion, idUsuario]);

        return resultado;

    } catch (error) {
        console.log("error en crearPublicacionModel", error);
        throw error;
    }
};
//funciona lista las publicaciones de un usuario (solo las activas)
export const listarPublicacionesModel = async () => {
    try {
        const query = `
            SELECT    
                p.id_publicacion,
                p.titulo,
                u.nombre_usuario,
                MIN(i.ruta_url) AS ruta_url 
            FROM publicaciones p 
            JOIN usuarios u ON p.id_usuario = u.id_usuario
            LEFT JOIN imagenes i ON p.id_publicacion = i.id_publicacion
            WHERE p.estado = 1 
            GROUP BY p.id_publicacion, p.titulo, u.nombre_usuario 
            ORDER BY p.fecha_creacion DESC 
            LIMIT 12`;
            
        const [resultado] = await db.query(query);
        return resultado;

    } catch (error) {
        console.log("error en listarPublicacionesModel", error);
        throw error;
    }
};

export const obtenerPublicacionPorIdModel = async (id) => {
    try {

        const query = ` SELECT 
            publi.id_publicacion,
            publi.titulo,
            publi.descripcion,
            publi.fecha_creacion,
            user.nombre_usuario
        FROM publicaciones publi
        JOIN usuarios user ON publi.id_usuario = user.id_usuario
        WHERE publi.id_publicacion = ? AND publi.estado = 1`;
        const [resultado] = await db.query(query, [id]);
        return resultado;

    } catch (error) {
        console.log("obtener publicacion por id", error);
        throw error;
    }
};

export const editarPublicacionModel = async (titulo, descripcion, id_publicacion, id_usuario) => {
    try {

        const query =`UPDATE publicaciones SET titulo = ?, descripcion = ? 
        WHERE id_publicacion = ? 
        AND id_usuario = ? AND estado = 1`;
        const [resultado]=await db.query(query, [titulo, descripcion, id_publicacion, id_usuario]);
        return resultado;

    } catch (error) {
        console.log("error en editarPublicacion", error);
        throw error;
    }
}

export const eliminarPublicacionModel = async(id_publicacion)=>{
    try {

        const query = `UPDATE publicaciones SET estado = 0 WHERE id_publicacion = ? AND estado = 1`;
        const [resultado] = await db.query(query, [ id_publicacion]);
        return resultado;

    } catch (error) {
        console.log("Error en eliminarPublicacion model")
        throw error;
    }

}

export const obtenerTodasLasPublicacionesModel = async() => {
    try {
        const query = `SELECT 
            publi.id_publicacion,
            publi.titulo,
            publi.descripcion,
            publi.fecha_creacion,
            u.nombre_usuario
        FROM publicaciones publi
        JOIN usuarios u ON publi.id_usuario = u.id_usuario
        WHERE publi.estado = 1
        ORDER BY publi.fecha_creacion DESC`;
        const [resultado] = await db.query(query,(1));
        return resultado;

    } catch (error) {
        console.log("Error en el servidor model obtenerTodasLasPublicacionesModel")
        throw error;
    }
}


export const obtenerPublicacionesPorUsuarioModel = async (idUsuario) => {

    const query = `SELECT id_publicacion, titulo, descripcion, fecha_creacion
        FROM publicaciones
        WHERE id_usuario = ?
        AND estado = 1 ORDER BY fecha_creacion DESC`;

    const [resultado] = await db.query(query, [idUsuario]);

    return resultado;
};

export const buscarPublicacionesModel = async (termino) => {
    const query = `
        SELECT p.*, u.nombre_usuario 
        FROM publicaciones p
        JOIN usuarios u ON p.id_usuario = u.id_usuario
        WHERE (p.titulo LIKE ? OR p.descripcion LIKE ?) AND p.estado = 1`;
    const [res] = await db.query(query, [`%${termino}%`, `%${termino}%`]);
    return res;
};

/**
 * Obtiene las publicaciones de los usuarios seguidos por el usuario actual.
 * Requerimiento TPI 4: Sección "Publicaciones de usuarios que sigo".
 */
export const publicacionesDeUsuariosSeguidosModel = async (idUsuarioLogueado) => {
    try {
        const quety = `SELECT p.*, u.nombre_usuario 
            FROM publicaciones p
            JOIN seguidores s ON p.id_usuario = s.id_usuario_seguido
            JOIN usuarios u ON p.id_usuario = u.id_usuario
            WHERE s.id_usuario_seguidor = ? AND p.estado = 1
            ORDER BY p.fecha_creacion DESC`;
        const [resultado] = await db.query(quety, [idUsuarioLogueado]);
        
    } catch (error) {
        console.log("error en publicacionesDeUsuarioSeguidos");
        throw error;
    }
}