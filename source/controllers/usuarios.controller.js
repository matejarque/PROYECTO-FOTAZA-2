//lo que pide la funcion nombre, correo, contra

import { crearUsuario, editarUsuario} from "../models/usuarios.model.js";
import bcrypt from "bcrypt";

export const registroUsuario = async(req, res) =>{
    try{
        const datos = req.body;
        //debo modificar o ampliar la validacion
        if(!datos.nombre || !datos.email || !datos.contra){
            return res.status(400).json({mensaje: "faltan datos"})
        }
        
        const { nombre, email: correo, contra } = datos;
        const hash = await bcrypt.hash(contra, 10);
        await crearUsuario(nombre, correo, hash)
    } catch(error){
        res.status(500).json({mensaje: "error en el servidr"})
    }
}

export const editarUsuarios = async(req, res) =>{
    try{
        const datos = req.body;
        if(!datos.nombre || datos.nombre == null){
        return res.status(400).json({mensaje: "error"})
    }

    await editarUsuario(nombre);
    }catch(error){
       return res.status(500).json({mensaje: "error"})
    }
}