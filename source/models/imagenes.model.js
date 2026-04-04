import db from "../config/db.js";
//imagenes{id_imagen, id_publicacion, ruta_url, id_licencia, marca_agua_texto}
//id_publicacion, ruta_url, id_licencia, marca_agua_texto
export const registrarImagenAPublicacionModel = async (idPublicacion, rutaUrl, ancho, alto, peso, idLicencia, marcaDeAgua) => {
    try {
        const query = `
        INSERT INTO imagenes (id_publicacion, ruta_url, ancho, alto, peso_kb, id_licencia, marca_agua_texto) 
        VALUES (?, ?, ?, ?, ?, ?, ?)`;
        const [resultado] = await db.query(query, [idPublicacion, rutaUrl, ancho, alto, peso, idLicencia, marcaDeAgua]);
        return resultado;
    } catch (error) {
        console.log("error en registrarImagenPublicacionModel", error);
        throw error;
    }
}

export const listarImagenesPorPublicacionModel = async (idPublicacion) => {
    try {
        const query =`SELECT id_imagen, ruta_url, ancho, alto, peso_kb, id_licencia, marca_agua_texto FROM imagenes
        WHERE id_publicacion = ?`
        const [resultado] = await db.query(query, [idPublicacion]);
        return resultado;
    } catch (error) {
        console.log("error en listarImagenesPorPublicacion");
        throw error;
    }
}