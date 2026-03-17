//lo que pide la funcion nombre, correo, contra

import { crearUsuario} from "../models/usuarios.model.js";
import brcrypt from "bcrypt";

export const registroUsuario = async(req, res) =>{
    try{
        //debo modificar o ampliar la validacion
        if(!nombre, email, contra){
            return res.status(400).json({mensaje: "faltan datos"})
        }
        
        const hash = await brcrypt.hash(contra, 10);
        await crearUsuario(nombre, correo, hash)
    } catch(error){
        res.status(500).json({mensaje: "error en el servidr"})
    }
}