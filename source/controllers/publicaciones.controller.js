import { crearPublicacionModel, eliminarPublicacionModel, editarPublicacionModel, obtenerPublicacionPorIdModel, listarPublicacionesModel, obtenerTodasLasPublicacionesModel } from "../models/publicaciones.model.js";


export const crearPublicacionController = async (req, res) => {
    try {
        const { titulo, descripcion, idUsuario } = req.body;

        if (!titulo || !descripcion || !idUsuario) {
            return res.status(400).json({ mensaje: "Faltan datos" });
        }

        const resultado = await crearPublicacionModel(titulo, descripcion, idUsuario);

        return res.status(201).json({mensaje: "Publicación creada", id: resultado.insertId});

    } catch (error) {
        console.log("error en crearPublicacionController", error);
        return res.status(500).json({ mensaje: "Error en el servidor" });
    }
};


export const listarPublicacionesController = async (req, res) => {
    try {
        const {id} = req.body;
        const publicaciones = await listarPublicacionesModel(id);
        return res.status(200).json({mensaje: "Publicaciones obtenidas", data: publicaciones});

    } catch (error) {
        console.log("error en listarPublicacionesController", error);
        return res.status(500).json({ mensaje: "Error en el servidor" });
    }
};

export const obtenerPublicacionPorIdController = async (req, res) => {
    try {
        const { id_usuario } = req.body;

        if (!id_usuario) {
            return res.status(400).json({ mensaje: "Falta el ID" });
        }

        const publicacion = await obtenerPublicacionPorIdModel(id_usuario);

        return res.status(200).json({mensaje: "se encontro la publicacion", data: publicacion});

    } catch (error) {
        console.log("error en obtenerPublicacionPorIdController", error);
        return res.status(500).json({ mensaje: "Error en el servidor" });
    }
};


//faltan los dos de abajo

export const eliminarPublicacionController = async (req, res) =>{
try {
    
} catch (error) {
    
}

}

export const editarPublicacionController = async (req, res) =>{
    try {
        
    } catch (error) {
        
    }
}

export const obtenerTodasLasPublicacionesController = async (req, res) => {   
    try {
        const publicacion = await obtenerTodasLasPublicacionesModel();
        return res.status(200).json({mensaje: "se encontro la publicacion", data: publicacion});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ mensaje: "Error en el servidor-catchObtenerTodasLasPublicacionesController" });
    }
}


