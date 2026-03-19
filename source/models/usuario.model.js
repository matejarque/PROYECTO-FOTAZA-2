import db from '../config/db.js'

/**
 * datos que tiene: id_usuario, nombre_usuario, correo_electronico, contrasena, id_rol, fecha_creacion, estado
 */
/**datos si o si requeridos en usuario: 
 * nombre_usuario, correo_electronico, contrasena, id_rol - 
 * id_rol pr defecto les da usuario */

export const crearUsuario = async(nombre, correo, contra) => {
    
    try{
        const query = `INSERT INTO usuarios (nombre_usuario, correo_electronico, contrasena, id_rol)
        VALUES (?, ?, ?, 3)`;
        
        const [resultado] = await db.query(query, [nombre, correo, contra]);
        console.log("se inserta crear usuario:", resultado);
        return resultado;
    }catch(error){
        console.log("error en crear usuario model:", error); 
        throw error;
    }
};


//por si se quiere modificar el usuario (no recuerdo si era necesario)
export const editarUsuario = async(nombre, correo, idusuario) =>{
    try{
        const query = `UPDATE usuarios SET nombre_usuario = ?, correo_electronico = ?  WHERE id_usuario = ?`
        const [resultado] = await db.query(query, [nombre, correo, idusuario]);
        return[resultado];
    }catch(error){
        console.log("error en editarusuario model");
        throw error;
    }
}



//para suspender temporalmente o indefinido (repasar pdf)
export const suspenderUsuario = async(nombre_usuario, estado) => {
    try{
    const query = `UPDATE usuarios SET estado = ? WHERE nombre_usuario = ?`;
    const [resultado] = await db.query(query,[estado, nombre_usuario]);
    console.log("usuario suspendido");
    return [resultado];
    }catch(error){
        console.log("error en suspender usuario model", error);
        throw error;
    }
};


//para que un superAdmin le de rol de moderador a otro usuario por ¿nombre o correo? a eleccion debe de ser mejor
export const crearModerador = async(nombre_usuario) =>{
    try {
        const query = `UPDATE usuarios SET id_rol = 2 WHERE nombre_usuario = ?`;
        const [resultado] = await db.query(query,[nombre_usuario]);
        return[resultado];

    } catch (error) {
        console.log("error en crearModerador", error)
        throw error;
    }
}


//realiar estos buscadores para encontrar los usuarios
export const buscarUsuarioPorNombre = async(nombre) =>{
    try {
        const query = `SELECT nombre_usuario FROM usuarios WHERE nombre_usuario LIKE ?`;
        console.log("error en buscar usuario por nombre");
        const[resultado] = await db.query(query[`%${nombre}%`]);
        console.log("se encontro el usuario");
        return[resultado];
    } catch (error) {
        console.log("error al buscar usuario por nombre model", error);
        throw errorM;
    }
}

//realmente necesario?
export const buscarUsuarioPorEmail = async(correo) =>{
    try {
        const query = `SELECT * FROM usuarios WHERE correo_electronico = ?`;
        console.log("error al buscar usuario por correo");
        const[resultado] = await db.query(query,[correo]);
    } catch (error) {
        console.log("error al buscar usuario por correo");
        throw error;
    }
}

//este me sirve para otras funciones
export const buscarUsuarioPorId = async() =>{}

//modificar contrasena
export const cambiarContrasena = async() =>{

}

