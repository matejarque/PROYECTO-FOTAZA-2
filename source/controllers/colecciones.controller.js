
import {crearColeccionModel, cambiarEstadoPublicoOPrivadoModel, 
    listarColeccionesUsuarioModel, obtenerPublicacionesDeColeccionModel, 
    agregarPublicacionAColeccionModel } from "../models/colecciones.model.js";
//id_usuario, nombre, descripcion, estado
//id_coleccion, id_usuario, estado
//id_coleccion, id_publicacion

export const crearColeccionController = async (req, res) => {
    try {
        //const {id_usuario} = req.session
        const {id_usuario, nombre, descripcion, estado} = req.body;
        if(!id_usuario || !nombre || estado === undefined){
            return res.status(400).json({mensaje: "debe de ingresar todos los datos "});
        }
        const resultado = await crearColeccionModel(id_usuario, nombre, descripcion, estado);
        return res.status(200).json({mensaje: "Se ha creado correctamente la coleccion", dato: resultado.insertId});

    } catch (error) {
        console.log("error en crearColeccionModel", error);
        res.status(500).json({mensaje: "error en servidor/crearColeccionModel"});
    }
}


export const cambiarEstadoPublicoOPrivadoController = async(req, res) => {
    try {
        //const {id_usuario} = req.session;
        const {id_coleccion, id_usuario, estado} = req.body;
        if(!id_coleccion || !id_usuario || estado === undefined){
            return res.status(400).json({mensasje: "Faltan datos"});
        }
        const resultado = await cambiarEstadoPublicoOPrivadoModel(id_coleccion, id_usuario, estado);
        return res.status(200).json({mensaje: "Se modifico el estado", dato: resultado.insertId});
    } catch (error) {
        console.log("error en cambiarEstadoPublicoOPrivadoController", error);
        res.status(500).json({mensaje: "Error en servidor/cambiarEstadoPublicoOPrivado"});
    }
}


export const listarColeccionesUsuarioController = async (req, res) => {
    try {
        //const { id_usuario } = req.user; // ->recordar de sacarlo de jwt
        const {id_usuario} = req.params;
        const resultado = await listarColeccionesUsuarioModel(id_usuario);
        res.status(200).json(resultado);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener colecciones" });
    }
};

export const obtenerPublicacionesDeColeccionController = async (req, res) => {
    try {
        const { id_coleccion } = req.params;

        if (!id_coleccion) {
            return res.status(400).json({ mensaje: "falta dato/id" });
        }

        const publicaciones = await obtenerPublicacionesDeColeccionModel(id_coleccion);

        if (publicaciones.length === 0) {
            return res.status(200).json({mensaje: "Esta coleccion notiene publicaciones guardadas", datos: []});
        }

        return res.status(200).json({mensaje: "se obtubo la coleccion.",cantidad: publicaciones.length, datos: publicaciones});

    } catch (error) {
        console.error("Error en obtenerPublicacionesDeColeccionController:", error);
        return res.status(500).json({mensaje: "Error interno en el servidor al tratar de recuoerar la coleccion."});
    }
};


export const agregarPublicacionAColeccionController = async (req, res) => {
    
    try {
        //agregar el idUsuario, si no, cualquiera podrria agregarla
        //Agregar alguna logica para evitar cargar la misma publicacion
        const {id_coleccion, id_publicacion} = req.body;
        if(!id_coleccion || !id_publicacion){
            return res.status(400).json({mensasje: "Faltan datos"});
        }

        const resultado = await agregarPublicacionAColeccionModel(id_coleccion, id_publicacion);
        return res.status(200).json({mensaje: "Se modifico el estado", dato: resultado});

    } catch (error) {

        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ mensaje: "Esta publicacion ya está en la coleccion" });
        }

        console.log("error en agregarPublicacionAcoleccionController", error);
        res.status(500).json({mensaje: "Error en servidor/agregarPublicacionAColeccionController"});
    }
}