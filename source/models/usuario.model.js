import db from '../config/db.js'

/**
 * datos que tiene: id_usuario, nombre_usuario, correo_electronico, contrasena, id_rol, fecha_creacion, estado
 */
/**datos si o si requeridos en usuario: 
 * nombre_usuario, correo_electronico, contrasena, id_rol - 
 * id_rol pr defecto les da usuario */


//funcion flecha para crear el usuario, solo requiere, nombre, correo y contrasena
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


//funacion para que el usuario pueda editar su perfil, solo requiere, nombre, correo y para validar el usuario el idusuario
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



//funcion flecha para suspender el usuario lo unico que modifica es su estado(activo, inactivo, baneado) a traves del nombre del mismo
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
        const query = `UPDATE usuarios SET id_rol = ? WHERE nombre_usuario = ?`;
        const [resultado] = await db.query(query,[nombre_usuario, 2]);
        return[resultado];

    } catch (error) {
        console.log("error en crearModerador", error)
        throw error;
    }
}


//funcion flecha que se encarga de buscar el nombre del usuario sin importar su exactitud
export const buscarUsuarioPorNombre = async(nombre) =>{
    try {
        const query = `SELECT id_usuario, nombre_usuario, correo_electronico FROM usuarios WHERE nombre_usuario LIKE ?`;
        const[resultado] = await db.query(query, [`%${nombre}%`]);
        console.log("se encontro el usuario");
        return resultado;
    } catch (error) {
        console.log("error al buscar usuario por nombre model", error);
        throw error;
    }
}

//funcion necesaria para validar un correo existente o no a la hora de crearlo mas adelante
export const buscarUsuarioPorEmail = async(correo) =>{
    try {
        const query = `SELECT * FROM usuarios WHERE correo_electronico = ?`;
        console.log("error al buscar usuario por correo");
        const[resultado] = await db.query(query,[correo]);
        return resultado;
    } catch (error) {
        console.log("error al buscar usuario por correo");
        throw error;
    }
}

//necesario para buscar un usuario por id
export const buscarUsuarioPorId = async() =>{}

//modificar contrasena
export const cambiarContrasena = async(nombre, contrasena) =>{
    try {;
        const query = `UPDATE usuarios SET contrasena = ? WHERE nombre_usuario = ?  `;
        const [resultado] = await db.query(query, [contrasena, nombre]);
        return resultado;
        console.log("contraseña modificada");
    } catch (error) {
        console.log("error al cambiar contraseña en model usuario", error);
        throw error;
    }
}

