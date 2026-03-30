import {} from '../models/seguidor.model.js';
//seguirModel dejarDeSeguirModel idUsuarioSeguidor, idUsuarioSeguido
export const seguirController = async (req, res) => {
    try {
        const { idUsuarioSeguidor, idUsuarioSeguido } = req.body;

        
        if (!idUsuarioSeguidor || !idUsuarioSeguido) {
            return res.status(400).json({ mensaje: "Faltan ids de usuarios para poder continuar" });
        }

        if (parseInt(idUsuarioSeguidor) === parseInt(idUsuarioSeguido)) {
            return res.status(400).json({ mensaje: "No se puede autoseguir" });
        }

        const resultado = await seguirModel(idUsuarioSeguidor, idUsuarioSeguido);
        return res.status(200).json({ mensaje: "ahora lo sigue", data: resultado});
        
    } catch (error) {
        console.log("Error en seguirController:", error);
        return res.status(500).json({ mensaje: "Error en sel serveral seguir usuario"});
    }   
}



export const dejarDeSeguirController = async (req, res) => {
    try {
        const { idUsuarioSeguidor, idUsuarioSeguido } = req.body;

        if (!idUsuarioSeguidor || !idUsuarioSeguido) {
            return res.status(400).json({ mensaje: "Faltan IDs para dejar de seguir" });
        }

        const resultado = await dejarDeSeguirModel(idUsuarioSeguidor, idUsuarioSeguido);

        if (resultado.affectedRows === 0) {
            return res.status(404).json({ mensaje: "no se encontro la ruta/o no existe esa relacion" });
        }

        return res.status(200).json({mensaje: "Ya no seguís a este usuario", data: resultado });

    } catch (error) {
        console.log("Error en dejarDeSeguirController:", error);
        return res.status(500).json({ mensaje: "Error interno al intentar dejar de seguir" });
    }
}




export const contarSeguidoresController = async (req, res) => {
    try {
        const {id_usuario} = req.params;

        if (!id_usuario) {
            return res.status(400).json({ mensaje: "falta el ID del usuario para contar seguidores" });
        }

        const retornoSeguidores = await contarSeguidoresModel(id_usuario);
        
        return res.status(200).json({mensaje: "seguidos obtenidos k", data: retornoSeguidores});

    } catch (error) {
        console.log("error en contarSeguidoresController:", error);
        return res.status(500).json({ mensaje: "Eerror ontar seguidores" });
    }
};