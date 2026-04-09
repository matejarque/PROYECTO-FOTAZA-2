import {registrarValoracionModel, obtenerAutorDeImagenModel,verificarVotoExistenteModel, sacarPromedioValoracionesModel} from "../models/valoraciones.model.js";

//idImagen, idUsuario, puntuacion -> model
export const registrarValoracionController = async (req, res) => {
    try {
        //const {idUsuario} = req.session;
        const {idUsuario} = req.params;
        const {idImagen, puntuacion} = req.body;

        if (!idImagen || !idUsuario || !puntuacion) {
            return res.status(400).json({mensaje: "faltan datos" });
        }

        const autorData = await obtenerAutorDeImagenModel(idImagen);
        if (autorData && autorData.id_usuario === parseInt(idUsuario)) {
            return res.status(400).json({ mensaje: "no se puede autovalorar" });
        }

        const votoPrevio = await verificarVotoExistenteModel(idImagen, idUsuario);
        if (votoPrevio.length > 0) {
            return res.status(400).json({ mensaje: "ya votaste esta imagen anteriormente" });
        }

        const resultado = await registrarValoracionModel(idImagen, idUsuario, puntuacion);
        return res.status(200).json({mensaje: "se registro la valoracion", id: resultado.insertId});

    } catch (error) {
        console.log("Error en registrarValoracionController", error);
        return res.status(500).json({ mensaje: "Error interno del servidor" });
    }
};



export const sacarPromedioValoracionesController = async (req, res) =>{
    try {
        const {idImagen} = req.params;
        if(!idImagen){
            return res.status(400).json({datos: "faltan el id de la imagen"});
        }

        const resultado = await sacarPromedioValoracionesModel(idImagen);
        return res.status(200).json({mensaje: "se saco el promedio", promedio: resultado});

    } catch (error) {
        console.log("error en sacarPromedioValoracionesController", error);
        res.status(500).json({mensaje: "error en servidor"})
    }
}
