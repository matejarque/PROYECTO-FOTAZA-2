//registrarImagenAPublicacionModel
//listarImagenesPorPublicacion

import { registrarImagenAPublicacionModel,listarImagenesPorPublicacionModel} from "../models/imagenes.model.js";

export const registrarImagenAPublicacionController = async(req, res)=>{
   //idPublicacion, rutaUrl, idLicencia, marcaDeAgua
    try {
        const {idPublicacion, rutaUrl, idLicencia, marcaDeAgua} = req.body;
        if(!idPublicacion || !rutaUrl || !idLicencia || !marcaDeAgua){
            return res.status(400).json({error: "faltant datos"});
        }
        const resul = await registrarImagenAPublicacionModel(idPublicacion, rutaUrl, idLicencia, marcaDeAgua);
        res.status(200).json({imagenRegistrada: resul});


    } catch (error) {
        console.log("error en registrarImagenApublicacionController", error);
        res.status(500).json({mensaje: "error en registrarImagenPublicacionController"});
    }

}


export const listarImagenesPorPublicacionController = async (req, res) => {
    try {
        
        const {idPublicacion} = req.params;

        if(!idPublicacion){
            return res.status(400).json({mensaje: "faltan idPublicacion, no se ha encontrado"});
        }

        const resultado = await listarImagenesPorPublicacionModel(idPublicacion);

        if(resultado.length === 0){
            return res.status(404).json({mensaje: "esta publicacion no se encuentra en la base de datos"})
        }

        return res.status(200).json({lista: resultado});

    } catch (error) {
        console.log("Error en listarImagenesPrPublicacionModel", error);
        res.status(500).json({error: "error en servidor", mensaje: error});
    }
}