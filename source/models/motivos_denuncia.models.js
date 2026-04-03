import db from "../config/db.js";

//no es tan necesaria porque se podria crear directamente en la base de datos
export const crearMotivoDenunciaModel = async (params) => {
    try {
        const query = `INSERT INTO motivos_denuncia (nombre) VALUES (?)`;
        const [resul] = await db.query(query, [params])
        return resul;
    } catch (error) {
        console.log("errror en")
        throw errror;
    }
}


export const listarMotivosDenunciaModel = async () => {
    try{
        const query = `SELECT * FROM motivos_denuncia`;
        const [resultado] = await db.query(query);
        return resultado;
    }catch(error){
        console.log("error en listarMotivosDenunciaModel");
        throw error;
    }
}



//funcionalidad extra por si se escribe mal el nombre del motivo
export const editarMotivoDenunciaModel = async(nombre, id)=>{
    try {
        const query = `UPDATE motivos_denuncia VALUES nombre = ?  WHERE id_motivo = ?`;
        const [resultado] = await db.query(query, [nombre, id])
        return resultado;
    } catch (error) {
        console.log("Error en editarMotivoDenunciaModel", error);
        throw error;
    }
}