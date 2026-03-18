import db from '../config/db.js'

/**
 * datos que tiene: id_usuario, nombre_usuario, correo_electronico, contrasena, id_rol, fecha_creacion, estado
 */
/**datos si o si requeridos en usuario: 
 * nombre_usuario, correo_electronico, contrasena, id_rol - 
 * id_rol pr defecto les da usuario */

export const crearUsuario = async(nombre, correo, contra) => {
    const query = `INSERT INTO usuarios (nombre_usuario, correo_electronico, contrasena)
    VALUES (?, ?, ?)`;

    const [resultado] = await db.query(query, [nombre, correo, contra]);
    return resultado;
};


//antes de continuar leer pdf, para ver que se requiere en usuario

//por si se quiere modificar el usuario (no recuerdo si era necesario)
export const editarUsuario = async() =>{}

//para suspender temporalmente o indefinido (repasar pdf)
export const suspenderUsuario = async(nombre_usuario, estado) => {
    const query = `UPDATE usuarios SET estado = ? WHERE nombre_usuario = ?`;

    const [resultado] = await db.query(query,[estado, nombre_usuario]);
    return [resultado];
};


//para que un superAdmin le de rol de moderador a otro usuario por ¿nombre o correo? a eleccion debe de ser mejor
export const crearModerador = async(nombre_usuario) =>{
    const query = `UPDATE usuarios SET id_rol = 2 WHERE nombre_usuario = ?`;
    const [resultado] = await db.query(query,[nombre_usuario]);
    return[resultado];
}

