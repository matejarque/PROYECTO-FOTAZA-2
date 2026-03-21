//lo que pide la funcion nombre, correo, contra

import { crearUsuario, editarUsuario, suspenderUsuario, crearModerador, buscarUsuarioPorNombre, buscarUsuarioPorEmail, cambiarContrasena} from "../models/usuario.model.js";
import bcrypt from "bcrypt";


export const buscarUsuarioPorEmailController = async(req, res) =>{
    try {
        const {email} = req.query; //->pase a query porque con params no me toma el @
        if(!email){
            return res.status(400).json({mensaje: "dato incorrecto email"});
        }
        const resultado = await buscarUsuarioPorEmail(email);

        if (resultado.length === 0) {
            return res.status(404).json({ mensaje: "usuario no encontrado" });
        }

        return res.status(200).json({mensaje: "usuario encontrado", dato: resultado});
    } catch (error) {
        res.status(500).json({mensaje: "error en sercidr controller-buscar-email"});
    }
}

//AMPLIAR LA VALIDACION O HACERLO MAS ADELANTE?
export const crearUsuarioController = async(req, res) =>{
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

export const editarUsuarioController = async(req, res) =>{
    try{
        const {nombre, correo, idusuario} = req.body;
        if(!nombre){
            return res.status(400).json({mensaje: "error"});
        }

    await editarUsuario(nombre, correo, idusuario);
    return res.status(200).json({mensaje: "Usuario editado"});

    }catch(error){
       return res.status(500).json({mensaje: "error"}, error);
    }
}
//nombre_usuario, estado
export const suspenderUsuarioController = async(req, res) =>{
    try{
        const {nombre, estado} = req.body;
            if(!nombre || !estado){
                return res.status(400).json({mensaje: "faltan datos"})
            }
             console.log("error en suspender usuario controller salteif"); 
            await suspenderUsuario(nombre, estado);
            return res.status(200).json({mensaje: "usuario dormido"});
    
    }catch(error){
        console.log("error en suspender usuario controller", error);
        return res.status(500).json({mensaje: "Error en el sercidor"})
    }

}

export const crearModeradorController = async (req, res) => {
    try {
        const {nombre} = req.body;
        if(!nombre){
            return res.status(400).json({mensaje: "falta el nombre"});
        }
        await crearModerador(nombre);
        return res.status(200).json({mensaje: "Usuario ahora es moderador"});

    } catch (error) {
        console.log("error en el crear moderador", error);
                return res.status(500).json({mensaje: "error en el servidor"});
    }
}


export const buscarUsuarioPorNombreController = async(req, res) =>{
    try {
        const {nombre} = req.params;

         if (!nombre) {
            return res.status(400).json({ mensaje: "Falta el nombre" });
        }
        
        const usuarios = await buscarUsuarioPorNombre(nombre);
        return res.status(200).json({mensaje: "Usuario encontrado", data: usuarios});

    } catch (error) {
        console.log("error en buscar usuario por nombre/controller", error);
        return res.status(500).json({mensaje: "error en el servidor"});
    }
}

export const cambiarContrasenaController = async(req, res) =>{
    try {
        
        const {nombre, contrasenaNueva} = req.body;

         if (!nombre || !contrasenaNueva) {
            return res.status(400).json({ mensaje: "Faltan datos" });
        }

        const hash = await bcrypt.hash(contrasenaNueva, 10);
        await cambiarContrasena(nombre, hash);
        
    } catch (error) {
        console.log("Error en cambiar contraseña controller", error);
        return res.status(500).json({mensaje: "error servidor controller cambiar contrasena"});
    }
}


