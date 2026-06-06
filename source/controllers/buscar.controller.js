import { buscarPublicacionesModel } from "../models/publicaciones.model.js";
import { listarComentariosPorPublicacionModel } from "../models/comentarios.model.js";

export const buscarPublicacionesController = async (req, res) => {
    try {
        const { q, filtroCategoria, filtroOrden } = req.query;


        if (!q && !filtroCategoria) {
            return res.redirect("/");
        }

        const resultadosRaw = await buscarPublicacionesModel(q, filtroCategoria, filtroOrden);

        const publicacionesProcesadas = await Promise.all(
            resultadosRaw.map(async (pub) => {
            
                const comentarios = await listarComentariosPorPublicacionModel(pub.id_publicacion);

                const imagenes = pub.imagenes_data
                    ? pub.imagenes_data.split('|').map(imgStr => {
                          const [id_imagen, ruta_url, promedio, votos] = imgStr.split(';');
                          return {
                              id_imagen: parseInt(id_imagen),
                              ruta_url,
                              promedio: parseFloat(promedio || 0).toFixed(1),
                              votos: parseInt(votos || 0)
                          };
                      })
                    : [];

                return {
                    ...pub,
                    imagenes,
                    comentarios
                };
            })
        );

        return res.render("pages/index", {
            publicaciones: publicacionesProcesadas,
            usuarioLogueado: req.session.usuarioLogueado,
            busqueda: { q, filtroCategoria, filtroOrden }
        });

    } catch (error) {
        console.error("Error en el controlador de búsqueda:", error);
        return res.status(500).render("pages/index", {
            publicaciones: [],
            usuarioLogueado: req.session.usuarioLogueado,
            error: "Ocurrió un error inesperado al realizar la búsqueda."
        });
    }
};