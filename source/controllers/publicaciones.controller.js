import { crearPublicacionModel, eliminarPublicacionModel, editarPublicacionModel, obtenerPublicacionPorIdModel, listarPublicacionesModel, obtenerTodasLasPublicacionesModel, publicacionesDeUsuariosSeguidosModel } from "../models/publicaciones.model.js";
import { suspenderUsuarioODarDeAltaModel, buscarUsuarioPorIdModel } from "../models/usuario.model.js";
import { registrarImagenAPublicacionModel} from "../models/imagenes.model.js"


export const crearPublicacionController = async (req, res) => {
    try {
        const idUsuario = req.session.usuarioLogueado.id;

        let { titulo, descripcion, idLicencia, marcaAgua } = req.body;

        //par amandar el id licencia como 4
        if (!idLicencia || idLicencia === "") {
            idLicencia = 4; 
        }

        if (!titulo || !descripcion) {
            return res.status(400).json({ mensaje: "Faltan datos" });
        }

        const resultado = await crearPublicacionModel(titulo, descripcion, idUsuario);
        const idPublicacion = resultado.insertId;

        if (req.files && req.files.length > 0) {
            for (const file of req.files) {
                const ruta = "/img/" + file.filename;

                await registrarImagenAPublicacionModel(idPublicacion, ruta, idLicencia, marcaAgua || null);
            }
        }

        return res.redirect("/perfil");

    } catch (error) {
        console.log("ERROR CONTROLLER:", error);
        return res.status(500).json({ mensaje: "Error en el servidor" });
    }
};

export const listarPublicacionesController = async (req, res) => {
    try {
    
        const publicaciones = await listarPublicacionesModel();
        return res.status(200).json({mensaje: "Publicaciones obtenidas", data: publicaciones});

    } catch (error) {
        console.log("error en listarPublicacionesController", error);
        return res.status(500).json({ mensaje: "Error en el servidor" });
    }
};

export const obtenerPublicacionPorIdController = async (req, res) => {
    try {
        const { id_publicacion } = req.params;

        if (!id_publicacion) {
            return res.status(400).json({ mensaje: "Falta el ID" });
        }

        const publicacion = await obtenerPublicacionPorIdModel(id_publicacion);

        return res.status(200).json({mensaje: "se encontro la publicacion", data: publicacion});

    } catch (error) {
        console.log("error en obtenerPublicacionPorIdController", error);
        return res.status(500).json({ mensaje: "Error en el servidor" });
    }
};



export const eliminarPublicacionController = async (req, res) =>{
try {

    const { id } = req.params;

    const resultado = await eliminarPublicacionModel(id);

    return res.status(200).json({mensaje: "se elimino la publicacion", data: resultado});

} catch (error) {

    console.log("error eliminarPublicacionController", error);

    return res.status(500).json({mensaje: "error en el servidor eliminarPublicacionController"});
}
}

export const editarPublicacionController = async (req, res) =>{
    try {
        const {idPublicacion} = req.params;
        const {idUsuario} = req.params; //esta diferente porque lueg lo paso por session
        const { titulo, descripcion} = req.body;

        if (!titulo || !descripcion || !idPublicacion) {
           return res.status(400).json({mensaje: "faltan datos para actualizar la publicación"});
        }

        const resultado = await editarPublicacionModel(titulo, descripcion, idPublicacion, idUsuario);
        if (resultado.affectedRows === 0) {
            return res.status(404).json({mensaje: "Publicacion no encontrada" });
        }
        return res.status(200).json({mensaje: "publicación actualizada", data: resultado});

    } catch (error) {
        console.log("error editarPublicacionController", error);
        return res.status(500).json({mensaje: "error en el servidor editarPublicacionController"});
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

export const validarYBajarPublicacionController = async (req, res) => {
    try {
        const { id_publicacion, id_usuario_autor } = req.body;

        if (!id_publicacion || !id_usuario_autor) {
            return res.status(400).json({ mensaje: "Faltan datos id_publicacion o id_usuario_autor" });
        }

        //se da de baja la publicacion
        await eliminarPublicacionModel(id_publicacion);

        // (lo nuevo) se cuentan cuantas publicaciones bajadas tiene el usuario
        const totalBajas = await contarPublicacionesBajasPorUsuarioModel(id_usuario_autor);

        // si el total de las publicaciones bajadas es de 3 automaticamente se da de baja al usuario
        if (totalBajas >= 3) {

            //Podria haber realizado unos join para hacer todo de una misma consulta, pero tengo una que buscar usuario por id.
            const [usuario] = await buscarUsuarioPorIdModel(id_usuario_autor);
            
            if (usuario) {
                await suspenderUsuarioODarDeAltaModel(usuario.nombre_usuario, 'inactivo');
                return res.status(200).json({mensaje: "Se elimino la publicacion, se alcanzaron las tres publicaciones eliminadas, usuario suspendido"});
            }
        }

        return res.status(200).json({ mensaje: "Publicacion eliminada por el validador/moderador" });

    } catch (error) {
        console.log("error en validarYBajarPublicacionController", error);
        return res.status(500).json({ mensaje: "Error en el servidor al validar publicación" });
    }
};

export const publicacionesDeUsuariosSeguidosController = async (req, params) => {
    try {
        const {idUsuarioLogueado} = req.params//luego pasarlo a req.session
        if(!idUsuarioLogueado){
            return res.status(400).json({mensaje: "falta el id del usuario logueado"});
        }
        const resultado = await publicacionesDeUsuariosSeguidosModel(idUsuarioLogueado);

        if(resultado.affectedRows === 0){
            return res.status(400).json({mensaje: "Aun no existen publicaciones"});
        }

        return res.status(200).json({mensaje: "se listaron todas las publicaciones de tus seguidos"});

    } catch (error) {
        console.log("errir en publicacionesDeUsuariosSeguidsController");
        res.status(500).json({dato: "error en el servidor/publicacionesDeUsuariosSeguidosController"});
    }
}




