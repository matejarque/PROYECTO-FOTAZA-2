import {registrarValoracionModel, obtenerAutorDeImagenModel,verificarVotoExistenteModel, sacarPromedioValoracionesModel} from "../models/valoraciones.model.js";

//idImagen, idUsuario, puntuacion -> model
export const registrarValoracionController = async (req, res) => {
    try {
        const idUsuario = req.session.usuarioLogueado.id;
        const { idImagen, puntuacion } = req.body;

        if (!idImagen || !puntuacion) {
            return res.status(400).send("Faltan datos requeridos.");
        }

        // esto valida si el usuario no es el dueño de la publicacion
        const [datosPublicacion] = await db.query(`
            SELECT p.id_usuario 
            FROM imagenes i
            JOIN publicaciones p ON i.id_publicacion = p.id_publicacion
            WHERE i.id_imagen = ?
        `, [idImagen]);

        if (datosPublicacion.length === 0) {
            return res.status(404).send("La imagen no pertenece a ninguna publicación activa.");
        }

        if (datosPublicacion[0].id_usuario === idUsuario) {
            return res.status(400).send("No puedes valorar tus propias imágenes.");
        }

        // verificar si el usuario ya voto esta imagen
        const [votoPrevio] = await db.query(`SELECT id_valoracion FROM valoraciones WHERE id_imagen = ? AND id_usuario = ?`, [idImagen, idUsuario]);

        if (votoPrevio.length > 0) {
            return res.status(400).send("Ya has valorado esta imagen anteriormente.");
        }

        // se inserta la nueva valoracion
        await db.query(`INSERT INTO valoraciones (id_imagen, id_usuario, puntuacion, fecha_creacion)VALUES (?, ?, ?, NOW())`, [idImagen, idUsuario, puntuacion]);

        // recarga la vista para actualizar la puntuacion
        return res.redirect("back");

    } catch (error) {
        console.log("Error en registrarValoracionController", error);
        return res.status(500).send("Error interno del servidor.");
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
