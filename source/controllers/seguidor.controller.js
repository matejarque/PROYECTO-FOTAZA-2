import {seguirModel, dejarDeSeguirModel,contarSeguidoresModel, verificarSeguimientoModel, listarSeguidoresModel} from '../models/seguidor.model.js';
//seguirModel dejarDeSeguirModel idUsuarioSeguidor, idUsuarioSeguido
export const seguirController = async (req, res) => {
    try {
        const idUsuarioSeguidor = req.session.usuarioLogueado.id;
        const { idUsuarioSeguido } = req.body;

        if (!idUsuarioSeguidor || !idUsuarioSeguido) {
            return res.status(400).json({ mensaje: "Faltan ids de usuarios" });
        }

        if (parseInt(idUsuarioSeguidor) === parseInt(idUsuarioSeguido)) {
            return res.status(400).json({ mensaje: "No se puede autoseguir" });
        }

        const existe = await verificarSeguimientoModel(idUsuarioSeguidor, idUsuarioSeguido);

        if (existe.length === 1) {
            return res.redirect(`/perfil/${idUsuarioSeguido}`); 
        } else {
            await seguirModel(idUsuarioSeguidor, idUsuarioSeguido);
            return res.redirect(`/perfil/${idUsuarioSeguido}`); 
        }
        
    } catch (error) {
        console.log("Error en seguirController:", error);
        return res.status(500).send("Error interno al intentar seguir.");
    }   
}

export const dejarDeSeguirController = async (req, res) => {
    try {
        const idUsuarioSeguidor = req.session.usuarioLogueado.id;
        const { idUsuarioSeguido } = req.body;

        if (!idUsuarioSeguidor || !idUsuarioSeguido) {
            return res.status(400).json({ mensaje: "Faltan IDs para dejar de seguir" });
        }

        await dejarDeSeguirModel(idUsuarioSeguidor, idUsuarioSeguido);
        return res.redirect(`/perfil/${idUsuarioSeguido}`); // <-- REDIRECCIÓN SEGURA EXPLÍCITA

    } catch (error) {
        console.log("Error en dejarDeSeguirController:", error);
        return res.status(500).send("Error interno al intentar dejar de seguir.");
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

export const obtenerSeguidoresYSeguidosController = async (req, res) => {
    try {
        const idUsuario = req.session.usuarioLogueado.id;

        const seguidores = await listarSeguidoresModel(idUsuario);
        const seguidos = await listarSeguidosModel(idUsuario);

        return res.status(200).json({seguidores,seguidos});

    } catch (error) {
        console.log("error en obtenerSeguidoresYSeguidosController", error);
        return res.status(500).json({ mensaje: "Error en el servidor" });
    }
};