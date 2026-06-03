import db from '../config/db.js';

export const getPublicacionesByFiltros = async ({ q, filtroCategoria, filtroOrden }) => {
    let queryBase = `
        SELECT p.*, u.nombre_usuario, c.nombre_categoria
        FROM publicaciones p
        INNER JOIN usuarios u ON p.id_usuario = u.id_usuario
        LEFT JOIN categorias c ON p.id_categoria = c.id_categoria
        WHERE p.estado = 1 
    `;

    const queryParams = [];

    // Filtro por Texto 
    if (q && q.trim() !== '') {
        queryBase += ` AND (p.titulo LIKE ? OR p.descripcion LIKE ?)`;
        const searchPattern = `%${q.trim()}%`;
        queryParams.push(searchPattern, searchPattern);
    }

    // Filtro por Categoría
    if (filtroCategoria && filtroCategoria !== '') {
        queryBase += ` AND c.nombre_categoria = ?`;
        queryParams.push(filtroCategoria);
    }

    // ordenamiento
    if (filtroOrden === 'valoradas') {
        queryBase += ` ORDER BY (
            SELECT IFNULL(AVG(v.puntuacion), 0) 
            FROM valoraciones v
            INNER JOIN imagenes img ON v.id_imagen = img.id_imagen
            WHERE img.id_publicacion = p.id_publicacion
        ) DESC`;
    } else {
        queryBase += ` ORDER BY p.fecha_creacion DESC`;
    }

    const [publicaciones] = await db.query(queryBase, queryParams);
    return publicaciones;
};

export const getImagenesByPublicacionId = async (idPublicacion) => {
    const [imagenes] = await db.query(
        `SELECT id_imagen, ruta_url, 
            (SELECT IFNULL(AVG(puntuacion), 0) FROM valoraciones WHERE id_imagen = i.id_imagen) as promedio,
            (SELECT COUNT(id_valoracion) FROM valoraciones WHERE id_imagen = i.id_imagen) as votos
         FROM imagenes i 
         WHERE i.id_publicacion = ?`,
        [idPublicacion]
    );
    return imagenes;
};