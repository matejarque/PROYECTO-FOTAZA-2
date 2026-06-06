import db from '../config/db.js';
import { listarComentariosPorPublicacionModel } from "./comentarios.model.js";

export const crearPublicacionModel = async (titulo, descripcion, idUsuario, idCategoria) => {
    try {
        const query = `
        INSERT INTO 
            publicaciones (titulo, descripcion, id_usuario, id_categoria) 
            VALUES (?, ?, ?, ?)`;
        const [resultado] = await db.query(query, [titulo, descripcion, idUsuario, idCategoria || null]);

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
                p.id_usuario,
                p.comentarios_abiertos, 
                u.nombre_usuario,
                GROUP_CONCAT(
                    CONCAT_WS(';', i.id_imagen, i.ruta_url, IFNULL(v.promedio, 0), IFNULL(v.votos, 0)) 
                    SEPARATOR '|'
                ) AS imagenes_data
            FROM publicaciones p 
            JOIN usuarios u ON p.id_usuario = u.id_usuario
            LEFT JOIN imagenes i ON p.id_publicacion = i.id_publicacion
            LEFT JOIN (
                SELECT 
                    id_imagen, 
                    AVG(puntuacion) AS promedio, 
                    COUNT(id_valoracion) AS votos 
                FROM valoraciones 
                GROUP BY id_imagen
            ) v ON i.id_imagen = v.id_imagen
            WHERE p.estado = 1 
            GROUP BY p.id_publicacion, u.nombre_usuario, p.titulo, p.descripcion, p.id_usuario, p.comentarios_abiertos 
            ORDER BY p.fecha_creacion DESC 
            LIMIT 12`;

        const [resultado] = await db.query(query);

        const publicacionesProcesadas = await Promise.all(
            resultado.map(async (pub) => {
                const comentarios = await listarComentariosPorPublicacionModel(pub.id_publicacion);

                const imagenes = pub.imagenes_data
                    ? pub.imagenes_data.split('|').map(imgStr => {
                          const [id_imagen, ruta_url, promedio, votos] = imgStr.split(';');
                          return {
                              id_imagen: parseInt(id_imagen),
                              ruta_url, 
                              promedio: parseFloat(promedio || 0).toFixed(1),
                              votos: parseInt(votos || 0)
                          };
                      })
                    : [];

                return {
                    ...pub,
                    imagenes,
                    comentarios
                };
            })
        );

        return publicacionesProcesadas;

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
        const [resultado] = await db.query(query); 
        return resultado;

    } catch (error) {
        console.log("Error en el servidor model obtenerTodasLasPublicacionesModel")
        throw error;
    }
}


export const obtenerPublicacionesPorUsuarioModel = async (idUsuario) => {

    const query = `
        SELECT id_publicacion, titulo, descripcion, fecha_creacion
            FROM publicaciones
            WHERE id_usuario = ?
            AND estado = 1 ORDER BY fecha_creacion
            DESC`;

    const [resultado] = await db.query(query, [idUsuario]);

    return resultado;
};

export const buscarPublicacionesModel = async (termino, filtroCategoria, filtroOrden) => {
    try {
        let query = `
            SELECT   
                p.id_publicacion,
                p.titulo,
                p.descripcion,
                p.id_usuario,
                p.comentarios_abiertos, 
                u.nombre_usuario,
                c.nombre_categoria,
                GROUP_CONCAT(
                    CONCAT_WS(';', i.id_imagen, i.ruta_url, IFNULL(v.promedio, 0), IFNULL(v.votos, 0)) 
                    SEPARATOR '|'
                ) AS imagenes_data
            FROM publicaciones p 
            JOIN usuarios u ON p.id_usuario = u.id_usuario
            LEFT JOIN categorias c ON p.id_categoria = c.id_categoria -- 👈 Agregamos el JOIN para poder filtrar por nombre
            LEFT JOIN imagenes i ON p.id_publicacion = i.id_publicacion
            LEFT JOIN (
                SELECT 
                    id_imagen, 
                    AVG(puntuacion) AS promedio, 
                    COUNT(id_valoracion) AS votos 
                FROM valoraciones 
                GROUP BY id_imagen
            ) v ON i.id_imagen = v.id_imagen
            WHERE p.estado = 1
        `;

        const queryParams = [];

        if (termino && termino.trim() !== "") {
            query += ` AND (p.titulo LIKE ? OR p.descripcion LIKE ?)`;
            queryParams.push(`%${termino}%`, `%${termino}%`);
        }

        if (filtroCategoria && filtroCategoria.trim() !== "") {
            query += ` AND c.nombre_categoria = ?`;
            queryParams.push(filtroCategoria);
        }

        query += ` GROUP BY p.id_publicacion, u.nombre_usuario, p.titulo, p.descripcion, p.id_usuario, p.comentarios_abiertos, c.nombre_categoria`;

        if (filtroOrden === "valoradas") {
            query += ` ORDER BY MAX(IFNULL(v.promedio, 0)) DESC`;
        } else {
            query += ` ORDER BY p.fecha_creacion DESC`;
        }
        
        const [resultado] = await db.query(query, queryParams);
        return resultado;

    } catch (error) {
        console.log("Error en buscarPublicacionesModel:", error);
        throw error;
    }
};

/**
 * Obtiene las publicaciones de los usuarios seguidos por el usuario actual
 */
export const publicacionesDeUsuariosSeguidosModel = async (idUsuarioLogueado) => {
    try {
        const query = `SELECT p.*, u.nombre_usuario 
            FROM publicaciones p
            JOIN seguidores s ON p.id_usuario = s.id_usuario_seguido
            JOIN usuarios u ON p.id_usuario = u.id_usuario
            WHERE s.id_usuario_seguidor = ? AND p.estado = 1
            ORDER BY p.fecha_creacion DESC`;
        const [resultado] = await db.query(query, [idUsuarioLogueado]);
        
        return resultado; 
        
    } catch (error) {
        console.log("error en publicacionesDeUsuarioSeguidos");
        throw error;
    }
}

export const obtenerTodasLasCategoriasModel = async () => {
    try {
        const query = `SELECT id_categoria, nombre_categoria FROM categorias ORDER BY nombre_categoria ASC`;
        const [resultado] = await db.query(query);
        return resultado;
    } catch (error) {
        console.log("error en obtenerTodasLasCategoriasModel");
        throw error;
    }

};