import {registrarDenunciaModel, contarDenunciasComentarioModel, contarDenunciasUnicasModel, listarPublicacionesParaValidarModel} from "../models/denuncias.model.js";


export const registrarDenunciaController  = async(req,res)=>{
    try {
        //const {idDenunciante} = req.session;
        const {idDenunciante, idPublicacion, idComentario, idMotivo, descripcion} = req.body;
        if(!idPublicacion || !idMotivo){
            return res.status(400).json({mensaje: "faltan idPublicacion o idMotivo"});
        }
        const resultado  = await registrarDenunciaModel(idDenunciante, idPublicacion, idComentario, idMotivo, descripcion);
        return res.status(200).json({mensaje: "denuncia registrada", resul: resultado});

    } catch (error) {
        console.log("Error en registrar registrarDenunciaController", error);
        res.status(500).json({mensaje: "Error en servidor/registrarDenunciaController"});
    }
}

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