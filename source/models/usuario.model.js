import db from '../config/db.js'

/**
 * datos que tiene: id_usuario, nombre_usuario, correo_electronico, contrasena, id_rol, fecha_creacion, estado
 */
/**datos si o si requeridos en usuario: 
 * nombre_usuario, correo_electronico, contrasena, id_rol - 
 * id_rol pr defecto les da usuario */


//funcion flecha para crear el usuario, solo requiere, nombre, correo y contrasena
export const crearUsuarioModel = async(nombre, correo, contra, biografia, fotoPerfil, pais) => {
    
    try{
        const query = `INSERT INTO usuarios (nombre_usuario, correo_electronico, contrasena, bio, foto_perfil, pais, id_rol, estado)
        VALUES (?, ?, ?, ?, ?, ?, 3, 'activo')`;
        
        const [resultado] = await db.query(query, [nombre, correo, contra, biografia, fotoPerfil, pais]);
        console.log("se inserta crear usuario:", resultado);
        return resultado;
    }catch(error){
        console.log("error en crear usuario model:", error); 
        throw error;
    }
};


//funacion para que el usuario pueda editar su perfil, solo requiere, nombre, correo y para validar el usuario el idusuario
export const editarUsuarioModel = async(nombre, biografia, fotoPerfil, pais, idUsuario) =>{
    try{
        const query = `UPDATE usuarios 
        SET nombre_usuario = ?, bio = ?, foto_perfil = ?, pais = ? WHERE id_usuario = ? AND estado = 1`;
        const [resultado] = await db.query(query, [nombre, biografia, fotoPerfil, pais, idUsuario]);
        return resultado;
    }catch(error){
        console.log("error en editarusuario model");
        throw error;
    }
}



//funcion flecha para suspender el usuario lo unico que modifica es su estado(activo, inactivo, baneado) a traves del nombre del mismo
export const suspenderUsuarioODarDeAltaModel = async(nombre_usuario, estado) => {
    try{
    const query = `UPDATE usuarios SET estado = ? WHERE nombre_usuario = ?`;
    const [resultado] = await db.query(query,[estado, nombre_usuario]);
    console.log("usuario suspendido");
    return resultado;
    }catch(error){
        console.log("error en suspender usuario model", error);
        throw error;
    }
};


//para que un superAdmin le de rol de moderador a otro usuario por ¿nombre o correo? a eleccion debe de ser mejor
export const crearModeradorModel = async(nombre_usuario) =>{
    try {
        
        const query = `UPDATE usuarios SET id_rol = 2 WHERE nombre_usuario = ? AND estado = 'activo'`;
        const [resultado] = await db.query(query,[nombre_usuario]);
        return resultado;

    } catch (error) {
        console.log("error en crearModerador", error)
        throw error;
    }
}


//funcion flecha que se encarga de buscar el nombre del usuario sin importar su exactitud
export const buscarUsuarioPorNombreModel = async(nombre) =>{
    try {

        const query = `SELECT id_usuario, nombre_usuario, foto_perfil, bio, pais 
        FROM usuarios 
        WHERE nombre_usuario LIKE ? AND estado = 'activo'`;

        const[resultado] = await db.query(query, [`%${nombre}%`]);
        console.log("se encontro el usuario");
        return resultado;
    } catch (error) {
        console.log("error al buscar usuario por nombre model", error);
        throw error;
    }
}

//funcion necesaria para validar un correo existente o no a la hora de crearlo mas adelante
export const buscarUsuarioPorEmailModel = async(pais) =>{
    try {
        const query = `SELECT id_usuario, nombre_usuario, foto_perfil, bio, pais FROM usuarios WHERE pais = ? AND estado = 'activo'`;
        console.log("error al buscar usuario por correo");
        const[resultado] = await db.query(query,[pais]);
        return resultado;
    } catch (error) {
        console.log("error al buscar usuario por correo");
        throw error;
    }
}

//necesario para buscar un usuario por id
export const buscarUsuarioPorIdModel = async(id) =>{
    try{

        const query = `
        SELECT id_usuario, nombre_usuario, correo_electronico, bio, foto_perfil, pais, id_rol, estado, fecha_creacion
        FROM usuarios
        WHERE id_usuario = ?`;

        const [resultado] = await db.query(query,[id]);

        return resultado;

    }catch(error){
        console.log("error al buscarUsuarioPorId", error);
        throw error;
    }
}

//modificar contrasena
export const cambiarContrasenaModel = async(idUsuario, contrasena) =>{
    try {;
        const query = `UPDATE usuarios SET contrasena = ? WHERE id_usuario = ? AND estado = 'activo' `;
        const [resultado] = await db.query(query, [contrasena, idUsuario]);
        return resultado;
        console.log("contraseña modificada");
    } catch (error) {
        console.log("error al cambiar contraseña en model usuario", error);
        throw error;
    }
}


//----Lo utilizo para auto eliminar un usuario
//
/**
 * Cuando un usuario llega a las 3 publicaciones “bajadas” el sistema inactiva su cuenta.
 * 
 */
export const contarPublicacionesBajasPorUsuarioModel = async (idUsuario) => {
    try {
        //La consulta cuenta la cantidad de veces donde el usuario tenga la publicacion eliminada
        const query = `SELECT COUNT(*) as total FROM publicaciones WHERE id_usuario = ? AND estado = 0`;

        const [resultado] = await db.query(query, [idUsuario]);//se espera una promesa donde se le pasa el idUsuario para la query
        return resultado[0].total;//se retorna el resultado total resultante de la consulta

    } catch (error) {
        console.log("Error en contarPublicacionesBajasPorUsuarioModel", error);
        throw error;
    }
};
