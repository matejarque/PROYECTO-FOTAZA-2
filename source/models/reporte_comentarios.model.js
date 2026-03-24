import db from '../config/db.js';

export const reporte_comentarios_reporteComentarioModel = async(idComentario, idUsuario, motivo) => {
    try {
        const query = `INSERT INTO reportes_comentarios (id_comentario, id_usuario, motivo) VALUES (?,?,?)`;
        const [resultado] = await db.query(query, [idComentario, idUsuario, motivo])
        return resultado;

    } catch (error) {
        console.log("errr en reporteComentarioModel", error)
        throw error;
    }
}
export const reporte_comentarios_contadorDeReportesModel = async(idComentario) => {
    try {
        const query = `SELECT COUNT(*) FROM reportes_comentarios WHERE id_comentario = ?`;
        const [resultado] = await db.query(query, [idComentario]);
        return resultado;
    } catch (error) {
        console.log("error en contadorDeReportesModel");
        throw error;
    }
}

export const reporte_comentarios_comentarioMasReportadoModel = async() => {
  try {
    const query = `SELECT id_comentario, COUNT(*) as reportes FROM reportes_comentarios GROUP BY id_comentario ORDER BY reportes DESC`
    const [resultado] = await db.query(query);
    return resultado
  } catch (error) {
    console.log("error en reporte_comentarios_comentarioMasReportado", error);
    throw error;
  }
}
 

export const reporte_comentarios_verificarReporteExistenteModel = async (idComentario, idUsuario) => {
    try {

        const query = `SELECT * FROM reportes_comentarios WHERE id_comentario = ? AND id_usuario = ?`;

        const [resultado] = await db.query(query, [idComentario, idUsuario]);
        return resultado;

    } catch (error) {

        console.log("error en verificarReporteExistenteModel", error);
        throw error;

    }
};