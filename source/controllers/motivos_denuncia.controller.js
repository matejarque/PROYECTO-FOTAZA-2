import {editarMotivoDenunciaModel, listarMotivosDenunciaModel, crearMotivoDenunciaModel} from "../models/motivos_denuncia.models.js";

export const crearMotivoDenunciaController = async (req, res) => {
    try {
        //const {idUsuario} = req.session;
        //const {idUsuario} = req.params;
        const {nombre} = req.body;
        const resultado = await crearMotivoDenunciaModel(nombre);
        return res.status(200).json({mensaje: "motivo creado", resul: resultado});

    } catch (error) {
        console.log("Error en crearMotivoDennciaController", error);
        res.status(500).json({mensaje: "error en crearMotivoDenunciaControler/servidor"});
    }
}


export const listarMotivoDenunciaController = async(req, res) => {
    try {

        const resultado = await listarMotivosDenunciaModel();
        return res.status(200).json({resul: resultado});

    } catch (error) {
        console.log("Errror en listar motivoDenunciaController". error)
        res.status(500).json({mensaje: "error en servidor/listarMotivoDenunciaController"})
    }
}


export const editarMotivoDenunciaController = async (req, res) => {
    try {
        const {nombre, id} = req.body;
        const resultado = await editarMotivoDenunciaModel(nombre, id);
        res.status(200).json({resul: resultado});
    } catch (error) {
        console.log("Errror en listar motivoDenunciaController". error)
        res.status(500).json({mensaje: "error en editarMotivoDenunciaController"})
    }
}


