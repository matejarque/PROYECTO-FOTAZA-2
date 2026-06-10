import {registrarDenunciaModel, contarDenunciasComentarioModel, contarDenunciasUnicasModel, listarPublicacionesParaValidarModel,
     existeDenunciaComentarioModel, actualizarEstadoComentarioModel} from "../models/denuncias.model.js";


export const registrarDenunciaController = async (req, res) => {

    try {
        const {idPublicacion, idComentario, idMotivo, descripcion} = req.body;
        const idDenunciante = req.session.usuarioLogueado.id;

        if (!idMotivo) {
            return res.status(400).json({mensaje: "Falta motivo"});
        }

        if (!idPublicacion && !idComentario) {
            return res.status(400).json({mensaje:"No marco un contenido, ingrese uno"});
        }

        // ======================
        // DENUNCIA COMENTARIO
        // ======================

        if (idComentario) {
            const yaDenuncio = await existeDenunciaComentarioModel(idDenunciante, idComentario);

            if (yaDenuncio) {
                return res.status(400).json({ mensaje: "Ya denunciaste este comentario"});
            }

            await registrarDenunciaModel(idDenunciante, idPublicacion, idComentario, idMotivo, descripcion);

            await actualizarEstadoComentarioModel(idComentario, "reportado");

            const totalDenuncias = await contarDenunciasComentarioModel(idComentario);

            if (totalDenuncias >= 3) {
                await actualizarEstadoComentarioModel(idComentario,"eliminado");
            }

            return res.status(200).json({mensaje:"Comentario denunciado"});
        }

        // ======================
        // DENUNCIA PUBLICACION
        // ======================

        await registrarDenunciaModel(idDenunciante, idPublicacion, null, idMotivo, descripcion);
        return res.status(200).json({mensaje:"Publicación denunciada"});

    } catch (error) {
        console.log("Error registrarDenunciaController",error);
        return res.status(500).json({mensaje:"Error interno"});
    }
};

export const contarDenunciasUnicasController = async (req, res) => {
    try {
        const {idPublicacion} = req.params;
        if(!idPublicacion){
             return res.status(404).json({mensaje: "faltan idPublicacion"});
        }
        const resultado = await contarDenunciasUnicasModel(idPublicacion);
        return res.status(200).json({mensaje: "denuncia registrada", resul: resultado});
    } catch (error) {
        console.log("Error en registrar contarDenunciasUnicasController", error);
        res.status(500).json({mensaje: "Error en servidor/contarDenunciasUnicasController"});
    }
}

export const listarPublicacionesParaValidarController = async(req, res) => {
    try {
        const resultado = await listarPublicacionesParaValidarModel();
        return res.status(200).json({mensaje: "Motivos Listados", resul: resultado});
    } catch (error) {
        console.log("Error en registrar contarDenunciasUnicasController", error);
        res.status(500).json({mensaje: "Error en servidor/contarDenunciasUnicasController"});
    }
}