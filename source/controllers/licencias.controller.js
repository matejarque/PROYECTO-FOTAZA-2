import {crearLicenciasModel, traerLicenciasModel} from "../models/licencias.model.js";

export const crearLicenciasController = async (req, res) => {
    try {
        const { tipo } = req.body;
        
        if (!tipo) {
            return res.status(400).json({ mensaje: "tipo de licencia es obligatorio" });
        }

        const resultado = await crearLicenciasModel(tipo);
        return res.status(200).json({mensaje: "licencia creada ", id: resultado.insertId });

    } catch (error) {
        
        console.log("Error en crearLicenciasController", error);
        return res.status(500).json({ mensaje: "error en el servidor al crear licencia" });
    }
};

export const traerLicenciasController = async (req, res) => {
    try {
       
        const resultado = await traerLicenciasModel();
        return res.status(200).json({mensaje: "Lista de licencias obtenida",data: resultado});

    } catch (error) {
        console.log("Error en traerLicenciasController", error);
        return res.status(500).json({mensaje: "rror en servidor al traer licencias"});
    }
};