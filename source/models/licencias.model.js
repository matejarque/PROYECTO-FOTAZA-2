import db from "../config/db.js";

export const crearLicenciasModel = async (params) => {
    try {
        const query = `INSERT IGNORE INTO licencias (tipo) VALUES (?)`;
        const [resultado] = await db.query(query,[params]);
        return resultado;
    } catch (error) {
        console.log("error en crearLicenciasModel")
        throw error;
    }
}



export const traerLicenciasModel = async ()=>{
    try {
        const query = `SELECT * FROM licencias`;
        const [resultado] = await db.query(query);
        return resultado;
    } catch (error) {
        console.log("Error en traerLicenciasModel", error);
        throw error;
    }
}