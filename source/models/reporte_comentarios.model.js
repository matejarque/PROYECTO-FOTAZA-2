import db from '../config/db.js';

export const reporte_comentarios_reporteComentarioModel = async(idComentario) => {
    try {
        const query = `INSERT INTO reporte_comentarios (id_comentario, id_usuario, motivo)`;
        const [resultado] = await db.query(query, [idComentario])
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

//podre agregar alguna consulta para automatizar el contador de reportes y asi quitarle la visibilidad al comentario?
//por ejemplo si llega a 5 reportes un comentario pasa de visible a oculto