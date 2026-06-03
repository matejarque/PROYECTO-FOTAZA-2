// Importamos los métodos específicos de la capa del Modelo
import * as BuscarModel from '../models/buscar.model.js';

export const buscarPublicaciones = async (req, res) => {
    try {
        const { q, filtroCategoria, filtroOrden } = req.query;
        const usuarioLogueado = req.session.usuarioLogueado || null;

        const publicaciones = await BuscarModel.getPublicacionesByFiltros({ q, filtroCategoria, filtroOrden });
o
        for (let pub of publicaciones) {
            pub.imagenes = await BuscarModel.getImagenesByPublicacionId(pub.id_publicacion);
        }

        return res.render('pages/index', {
            publicaciones,
            usuarioLogueado,
            busqueda: { q, filtroCategoria, filtroOrden } });

    } catch (error) {
        console.error('Error en el controlador de búsqueda:', error);
        return res.status(500).send('Error interno del servidor al procesar la búsqueda');
    }
};