import {generarInteresImagenModel, eliminarInteresImagenModel, traerInteresImagenModel} from "../models/interes_imagen.model.js";

export const generarInteresImagenController = async (req, res) => {
    try {
        //const {id_usuario_interesado} = req.session;
        const {id_imagen, id_usuario_interesado} = req.body;
        if(!id_imagen || !id_usuario_interesado){
            return res.status(400).json({mensaje: "Datos faltantes, id_imagen o id_usuario_interesado"});
        }
        const reultado = await generarInteresImagenModel(id_imagen, id_usuario_interesado);
        return res.status(200).json({mensaje: "Se genero correctamente", resultado: reultado.inserId});

    } catch (error) {
        console.log("Error en generarInteresImagenController", error)
        res.status(500).json({mensaje: "Error en servidor/generarInteresImagenCOntroller"});
    }
}



export const eliminarInteresImagenController = async (req, res) => {
    try {
        //const {id_usuario_interesado} = req.session
       const {id_interes, id_usuario_interesado} = req.body;
        if(!id_interes || !id_usuario_interesado){
            return res.status(400).json({mensaje: "Faltan datos id_interes/id_usuario_interesasdo"});
        }
        const resultado = await eliminarInteresImagenModel(id_interes, id_usuario_interesado);
        return res.status(200).json({mensaje: "se elimino correctamente", resultado: resultado.insertId});

    } catch (error) {
        console.log("error en eliminarInteresImagenController", error);
        res.statu(500).json({mensaje: "Error en servidor/eliminarInteresImagenController"});
    }
}

export const traerInteresImagenController = async (req, res) => {
    try {
        const {id_usuario_interesado} = req.params;//modificarlo a session

        if(!id_usuario_interesado){
            return res.status(400).json({mensaje: "Falta dato id_usuario_interesasdo"});
        }

        const resultado = await traerInteresImagenModel(id_usuario_interesado);
        return res.status(200).json({mensaje: "se listo correctamente", resultado: resultado});

    } catch (error) {
         console.log("error en traerIntereImagenController", error);
        res.statu(500).json({mensaje: "Error en servidor/traerIntereImagenController"});
    }
}