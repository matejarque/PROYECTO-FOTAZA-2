import db from "../config/db.js";

// Registrar una denuncia (publicacion o comentario)
export const registrarDenunciaModel = async (idDenunciante, idPublicacion, idComentario, idMotivo, descripcion) => {
    try {
        const query = `INSERT INTO denuncias (id_usuario_denunciante, id_publicacion, id_comentario, id_motivo, descripcion) VALUES (?, ?, ?, ?, ?)`;
        const [resultado] = await db.query(query, [idDenunciante, idPublicacion, idComentario, idMotivo, descripcion]);
        return resultado;
    } catch (error) {
        console.log("Error en registrarDenunciaModel", error);
        throw error;
    }
};

// Contar cuantos usuarios distintos denunciaron una publicacion -> (Regla de las 3 denuncias)
export const contarDenunciasUnicasModel = async (idPublicacion) => {
    try {
        const query = `SELECT COUNT(DISTINCT id_usuario_denunciante) as total FROM denuncias WHERE id_publicacion = ?`;
        const [resultado] = await db.query(query, [idPublicacion]);
        return resultado[0].total;
    } catch (error) {
        console.log("Error en contarDenunciasUnicasModel", error);
        throw error;
    }
};

// litar publicaciones para quien valide (moderador)
export const listarPublicacionesParaValidarModel = async () => {
    try {
        const query = `SELECT p.*, COUNT(d.id_denuncia) as total_denuncias 
            FROM publicaciones p 
            JOIN denuncias d ON p.id_publicacion = d.id_publicacion 
            GROUP BY p.id_publicacion 
            HAVING total_denuncias >= 3`;
        const [resultado] = await db.query(query);
        return resultado;
    } catch (error) {
        console.log("Error en listarPublicacionesParaValidarModel", error);
        throw error;
    }
};