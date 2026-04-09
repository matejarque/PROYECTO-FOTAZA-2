//id_etiqueta - mombre

import db from '../config/db.js'

export const listarEtiquetasPopularesModel = async () => {
    try {
        //agregue el where para traer solo si comienza con #
        const query = `
            SELECT e.id_etiqueta, e.nombre, COUNT(pe.id_publicacion) as total_usos
            FROM etiquetas e
            LEFT JOIN publicacion_etiquetas pe ON e.id_etiqueta = pe.id_etiqueta
            WHERE e.nombre LIKE '#%' -- Solo trae las que empiezan con #
            GROUP BY e.id_etiqueta
            ORDER BY total_usos DESC 
            LIMIT 10`;
        const [resultado] = await db.query(query);
        return resultado;
        
    } catch (error) {
         console.log("Error en listarEtiquetasPopularesModel", error);
        throw error;
    }
}

export const buscarOCrearEtiquetaModel = async (nombre) => {
    try {  
        const selectQuery = `SELECT id_etiqueta FROM etiquetas WHERE nombre = ?`;
        const [resultado] = await db.query(selectQuery, [nombre]);      
        
        if (existente.length > 0) {
            return {id_etiqueta: existente[0].id_etiqueta, nombre: existente[0].nombre, creada: false };
        }

        const insertQuery = `INSERT IGNORE INTO etiquetas (nombre) VALUES (?)`;
        await db.query(insertQuery, [nombre]);

        
        return resultado[0]; 
    } catch (error) {
        console.log("Error en buscarOcrearEtiquetamodel", error);
        throw error;
    }
}
