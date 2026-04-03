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
            p.descripcion,
            p.fecha_creacion,
            p.estado,
            u.nombre_usuario
        FROM publicaciones p JOIN usuarios u ON p.id_usuario = u.id_usuario
        WHERE p.estado = 1 ORDER BY p.fecha_creacion DESC`;

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

export const editarPublicacionModel = async (titulo, descripcion, id_publicacion) => {
    try {

        const query =`UPDATE publicaciones SET titulo = ?, descripcion = ? WHERE id_publicacion = ? AND estado = 1`;
        const [resultado]=await db.query(query, [titulo, descripcion, id_publicacion]);
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

