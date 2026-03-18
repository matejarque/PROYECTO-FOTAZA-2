//lo que pide la funcion nombre, correo, contra

import { crearUsuario, editarUsuario, suspenderUsuario, crearModerador} from "../models/usuario.model.js";
import bcrypt from "bcrypt";

//AMPLIAR LA VALIDACION O HACERLO MAS ADELANTE?
export const registroUsuario = async(req, res) =>{
    try{

        const { nombre, correo, contra } = req.body;
        if(!nombre || !correo || !contra){
            return res.status(400).json({mensaje: "faltan datos"})
        }
        
        
        const hash = await bcrypt.hash(contra, 10);
        await crearUsuario(nombre, correo, hash)
    } catch(error){
        console.log("ERROR REGISTRO:", error);
        res.status(500).json({mensaje: "error en el servidr"})
    }
}

export const editarUsuarios = async(req, res) =>{
    try{
        const {nombre} = req.body;
        if(!nombre){
            return res.status(400).json({mensaje: "error"});
     }

    await editarUsuario(nombre);
    return res.status(200).json({mensaje: "Usuario editado"});

    }catch(error){
       return res.status(500).json({mensaje: "error"});
    }
}
//nombre_usuario, estado
export const suspenderUsuario = async(req, res) =>{
    try{
        const {nombre, estado} = req.body;
            if(nombre != null){
                await suspenderUsuario(nombre, estado);
                return res.status(200).json({mensaje: "usuario dormido"});
            }
       console.log("error en suspender usuario controller salteif"); 
    }catch(error){
        console.log("error en suspender usuario controller", error);
        throw error;
    }

}

export const crearModerador = async (req, res) => {
    
}


