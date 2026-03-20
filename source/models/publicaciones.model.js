/**
 * id_publicacion
titulo
descripcion
id_usuario
comentarios_abiertos
fecha_creacion
estado
 */


export const crearPublicacionModel = async (titulo, descripcion, idUsuario) => {
    try {
        const query = `INSERT publicaciones (titulo, descripcion, id_usuario) VALUES (?, ?, ?)`;

        const [resultado] = await db.query(query, [titulo, descripcion, idUsuario]);

        return resultado;

    } catch (error) {
        console.log("error en crearPublicacionModel", error);
        throw error;
    }
};
export const listarPublicacionesModel = async () => {
    try {
        const query = `
            SELECT p.id_publicacion, p.titulo, p.descripcion, p.fecha_creacion, p.estado, user.nombre_usuario
            FROM publicaciones p 
            JOIN usuarios user ON p.id_usuario = user.id_usuario 
            WHERE p.estado = 1`;

        const [resultado] = await db.query(query);
        return resultado;

    } catch (error) {
        console.log("error en listarPublicacionesModel", error);
        throw error;
    }
};

export const obtenerPublicacionPorId = async (id) => {
    try {

        const query = `SELECT * FROM publicaciones WHERE id_publicacion = ? AND estado = 1`;
        const [resultado] = await db.query(query, [id]);
        return resultado;

    } catch (error) {
        console.log("obtener publicacion por id", error);
        throw error;
    }
};

export const editarPublicacionModel = async (titulo, descripcion, id_publicacion) => {
    try {

        const query =`UPDATE publicaciones SET titulo = ?, descripcion = ? WHERE id_publicacion = ?`;
        const [resultado]=await db.query(query, [titulo, descripcion, id_publicacion]);
        return resultado;

    } catch (error) {
        console.log("error en editarPublicacion", error);
        throw error;
    }
}

export const eliminarPublicacionModel = async(id)=>{
    try {

        const query = `UPDATE publicaciones SET estado = 0 WHERE id_publicacion = ?`;
        const [resultado] = await db.query(query, [id]);
        return resultado;

    } catch (error) {
        console.log("Error en eliminarPublicacion model")
        throw error;
    }

}

