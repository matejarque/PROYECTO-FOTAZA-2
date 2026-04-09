import { listarEtiquetasPopularesModel, buscarOCrearEtiquetaModel } from '../models/etiquetas.model.js'

export const listarEtiquetasPopularesController = async (req, res) => {
    try {
        const resultado = await listarEtiquetasPopularesModel();
        return res.status(200).json({mensaje: "Etiquetas populares obtenidas", data: resultado});
    } catch (error) {
        console.log("Error en listarEtiquetasPopularesController", error);
        return res.status(500).json({ mensaje: "Error en el servidor" });
    }
}

export const buscarOCrearEtiquetaController = async (req, res) => {
    try {
        const { nombre } = req.body;
        
        if (!nombre) {
            return res.status(400).json({ mensaje: "El nombre de la etiqueta es obligatorio" });
        }

        let nombreFormateado = nombre.trim().toLowerCase();
        if (!nombreFormateado.startsWith('#')) {
            nombreFormateado = `#${nombreFormateado}`;
        }

        const resultado = await buscarOCrearEtiquetaModel(nombreFormateado);
        return res.status(201).json({ mensaje: 'Etiqueta procesada correctamente', data: resultado });

    } catch (error) {
        console.log("Error en buscarOCrearEtiquetaController", error);
        return res.status(500).json({ mensaje: "Error al procesar la etiqueta" });
    }
}

/**Para mas adelante, ahora la voy a saltar, por si llegan a ingresar una etiqueta fuera de las normas.
 * 
 * export const eliminarEtiquetas
 * 
 */
