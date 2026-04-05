import db from "../config/db.js";
//id_usuario, nombre, descripcion, privada

export const crearColeccionModel = async (id_usuario, nombre, descripcion, privada) => {
    try {
        const query = `INSERT INTO coleccion (id_usuario, nombre, descripcion, privada) VALUES (?, ?, ?, ?)`;
        const [resultado] = await db.query(query, [id_usuario, nombre, descripcion, privada]);
        return resultado;
    } catch (error) {
        console.log("error en crearColeccionModel", error);
        throw error;
    }
}

export const cambiarEstadoPublicoOPrivado = async (id_coleccion, id_uuario) => {
    
}
