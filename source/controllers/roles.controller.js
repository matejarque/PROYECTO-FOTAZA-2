import {listarRolesModel, crearNuevoRolModel} from "../models/roles.model.js"

export const listarRolesController = async (req, res) => {
    try {
    
        const {nombreRol} = req.query; 
        const resultado = await listarRolesModel(nombreRol);

        return res.status(200).json({mensaje: "usuarios obtenidos",data: resultado});
    } catch (error) {
        console.log("Error en listarRolesController", error);
        return res.status(500).json({ mensaje: "error en el serviddor" });
    }
};

export const crearNuevoRolController = async (req, res) => {
    try {
        const {nombre} = req.body;

        if (!nombre) {
            return res.status(400).json({ mensaje: "ingrese un nombre para el nuevo rol" });
        }

        const resultado = await crearNuevoRolModel(nombre);

        return res.status(201).json({mensaje: "rol creado perfecto", id: resultado.insertId});
    } catch (error) {
        console.log("Error en crearNuevoRolController", error);
        return res.status(500).json({ mensaje: "Error al crear el rol" });
    }
};