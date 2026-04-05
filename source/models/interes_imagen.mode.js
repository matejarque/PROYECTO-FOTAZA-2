import db from "../config/db.js";

//id_interes id_imagen id_usuario_interesado fecha

export const generarInteresImagenModel = async(id_imagen, id_usuario_interesado) => {
    try {
        const query = `INSERT INTO interes_imagen (id_imagen, id_usuario_interesado) VALUES (?, ?)`;
        const [resultado] = await db.query(query,[id_imagen, id_usuario_interesado]);
        return resultado;
    } catch (error) {
        console.log("Error en generarInteresImagen", error);
        throw error;
    }
}

export const eliminarInteresImagenModel = async(id_interes, id_usuario_interesado)=>{
    try {
        const query = `DELETE FROM interes_imagen WHERE id_interes = ? AND id_usuario_interesado = ?`;
        const [resultado] = await db.query(query, [id_interes, id_usuario_interesado]);
        return resultado;
    } catch (error) {
        console.log("Error en eliminarInteresImagen", error);
        throw error;
    }
}

//traer imagenes de interes para este usuario
export const traerInteresImagenModel = async (id_usuario_interesado) => {
    try {
        const query = `SELECT i.id_imagen, i.ruta_url, p.titulo, int_img.id_interes
            FROM imagenes i 
            JOIN intereses_imagen int_img ON i.id_imagen = int_img.id_imagen
            JOIN publicaciones p ON i.id_publicacion = p.id_publicacion
            WHERE int_img.id_usuario_interesado = ?`;
        const [resultado] = await db.query(query,[id_usuario_interesado]);
        return resultado;
    } catch (error) {
        console.log("Error en traerInteresImagenModel")
        throw error;
    }
}