import db from '../config/db.js'

export const crearNuevoRolModel = async(nombre)=>{
    try {
        const query = `INSERT roles (nombre, estado) VALUES (?, 'activo')`;
        const [resultado] = await db.query(query,[nombre]);
        return resultado;
    } catch (error) {
        console.log("Error en crearModeradorModel", error);
        throw error;
    }
}

export const listarRolesModel = async(nombreRol)=>{
    try {
        const query = `
            SELECT u.id_usuario, u.nombre_usuario, u.correo_electronico 
            FROM usuarios u 
            JOIN roles r ON u.id_rol = r.id_rol
            WHERE r.nombre = ? AND estado = 1`;
        const [resultado] = await db.query(query,[nombreRol])
        return resultado;
    
    } catch (error) {
        console.log("Error en crearModeradorModel", error);
        throw error;
    }
}

//quitar rol a futuro o cambiar su estado