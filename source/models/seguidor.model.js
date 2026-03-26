//seguir, dejar de seguir, listarSeguidoresModel, listarSeguidosModel, contarSeguidoresModel
//necesito empezar a colocar comentarios en cada funcion
import db from "../config/db.js";
//datos de la base 
//id_usuario_seguidor, id_usuario_seguido, fecha_creacion
export const seguirModel = async(idUsuarioSeguidor, idUsuarioSeguido)=>{
    try{
        const query = `INSERT INTO seguidores (id_usuario_seguidor, id_usuario_seguido) 
        VALUES (?,?)`;
        const [resultado] = await db.query(query, [idUsuarioSeguidor, idUsuarioSeguido])
        return resultado;
    }catch(error){
        console.log("error en seguirModel", error);
        throw error;
    }
}



export const dejarDeSeguirModel = async(idUsuarioSeguidor, idUsuarioSeguido)=>{
    try {
        const query = `DELETE FROM seguidores 
        WHERE id_usuario_seguidor = ? AND id_usuario_seguido = ?`;
        const [resultado] = await db.query(query,[idUsuarioSeguidor, idUsuarioSeguido]);
        return resultado;

    } catch (error) {
        console.log("Error en dejarDeSeguirModel", error);
        throw error;
    }
}

export const listarSeguidoresModel = async (id_usuario_seguido) => {
    try {
        const query = `
            SELECT user.id_usuario, user.nombre_usuario, user.correo_electronico
            FROM usuarios user
            JOIN seguidores s ON user.id_usuario = s.id_usuario_seguidor
            WHERE s.id_usuario_seguido = ?`;
        
        const [resultado] = await db.query(query, [id_usuario_seguido]);
        return resultado;
        
    } catch (error) {
        console.log("Error en listarSeguidoresModel", error);
        throw error;
    }
}

export const contarSeguidoresModel = async (id_usuario) => {
    try {
        const querySeguidores = `SELECT COUNT(*) as total FROM seguidores WHERE id_usuario_seguido = ?`;
        const querySeguidos = `SELECT COUNT(*) as total FROM seguidores WHERE id_usuario_seguidor = ?`;

        const [[resSeguidores], [resSeguidos]] = await Promise.all([db.query(querySeguidores, [id_usuario]), db.query(querySeguidos, [id_usuario])]);

        return {seguidores: resSeguidores[0].total, seguidos: resSeguidos[0].total};
        
    } catch (error) {
        console.log("Eror en contarSeguidoresModel", error);
        throw error;
    }
}
