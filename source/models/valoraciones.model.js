//**
//Registrar/Actualizar-Obtener un promedio de valoracion por publicacion, algo para utilizar en el controler y verificar que el usuario no se autovalore */
import db from "../config/db.js";
//id_valoracion, id_imagen, id_usuario, puntuacion
export const registrarValoracionModel = async (idImagen, idUsuario, puntuacion) => {
    try {

        const query = `INSERT INTO valoraciones (id_imagen, id_usuario, puntuacion) VALUES (?, ?, ?)`;
        const [resultado] = await db.query(query, [idImagen, idUsuario, puntuacion]);
        return resultado;

    } catch (error) {
        console.log("Error en registrarValoracionModel", error);
        throw error;
    }
};

export const obtenerAutorDeImagenModel = async (idImagen) => {
    try {
        const query = `
            SELECT p.id_usuario FROM imagenes i
            JOIN publicaciones p ON i.id_publicacion = p.id_publicacion
             WHERE i.id_imagen = ?`;

        const [resultado] = await db.query(query, [idImagen]);
        return resultado[0];
    } catch (error) {
        console.log("Error en obtenerAutorDeImagenModel", error);
        throw error;
    }
};

export const verificarVotoExistenteModel = async (idImagen, idUsuario) => {
    try {
        
        const query = `SELECT * FROM valoraciones WHERE id_imagen = ? AND id_usuario = ?`;
        const [resultado] = await db.query(query, [idImagen, idUsuario]);
        return resultado;

    } catch (error) {
        console.log("Error en verificarVotoExistenteModel", error);
        throw error;
    }
};

export const sacarPromedioValoracionesModel = async (idImagen) => {
    try {
        const query = `SELECT AVG(puntuacion) AS promedio FROM valoraciones WHERE id_imagen = ?`;
        const [resultado] = await db.query(query, [idImagen]);
        return resultado;
    } catch (error) {
        console.log("Error en sacarPromedioValoracionesModel", error);
        throw error;
    }
}