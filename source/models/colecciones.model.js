import db from "../config/db.js";
//id_usuario, nombre, descripcion, privada

export const crearColeccionModel = async (id_usuario, nombre, descripcion, estado) => {
    try {
        const query = `INSERT INTO coleccion (id_usuario, nombre, descripcion, estado) VALUES (?, ?, ?, ?)`;
        const [resultado] = await db.query(query, [id_usuario, nombre, descripcion, estado]);
        return resultado;
    } catch (error) {
        console.log("error en crearColeccionModel", error);
        throw error;
    }
}

export const cambiarEstadoPublicoOPrivadoModel = async (id_coleccion, id_usuario, estado) => {
 try {
        const query = `UPDATE coleccion 
        SET estado = ? WHERE id_coleccion = ? AND id_uuario = ? `;
        const [resultado] = await db.query(query, [estado, id_coleccion, id_usuario]);
        return resultado;
 } catch (error) {
    console.log("Error en cambiarEtadoPublicoOPrivadoModel", error);
    throw error;
 }   
}

//listarColeccionesUsuarioModel
export const listarColeccionesUsuarioModel = async (id_usuario) => {
    try {
        const query = `SELECT * FROM colecciones WHERE id_usuario = ?`;
        const [resultado] = await db.query(query, [id_usuario]);
        return resultado;
    } catch (error) {
        console.log("Error en listarColeccionesUsuarioModel", error);
        throw error;
    }
}
//obtenerPublicacionesDeColeccionModel
export const obtenerPublicacionesDeColeccionModel = async (id_coleccion) => {
    const query = `
        SELECT p.* FROM publicaciones p
        JOIN publicaciones_coleccion pc ON p.id_publicacion = pc.id_publicacion
        WHERE pc.id_coleccion = ?`;
    const [resultado] = await db.query(query, [id_coleccion]);
    return resultado;
};


//Como es una tabla que depende de colecciones la manejo por aca
//publicaciones_coleccion
export const agregarPublicacionAColeccionModel = async (id_coleccion, id_publicacion) => {
    try {
        
        const query = `INSERT INTO publicaciones_coleccion (id_coleccion, id_publicacion) VALUES (?, ?)`;
        const [resultado] = await db.query(query, [id_coleccion, id_publicacion]);
        return resultado;

    } catch (error) {
        console.log("Error en agregarPublicacionAColeccionModel", error);
        throw error;
    }
};



