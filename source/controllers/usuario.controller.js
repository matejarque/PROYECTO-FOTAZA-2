//lo que pide la funcion nombre, correo, contra

import { crearUsuarioModel, editarUsuarioModel, suspenderUsuarioODarDeAltaModel, 
    verificarExistenciaNombreUsuarioModel ,crearModeradorModel, buscarUsuarioPorNombreModel, buscarUsuarioPorEmailModel, cambiarContrasenaModel} from "../models/usuario.model.js";
import bcrypt from "bcrypt";
import {listarPublicacionesModel} from '../models/publicaciones.model.js';



export const buscarUsuarioPorEmailController = async(req, res) =>{
    try {
        const {pais} = req.params; 
        if(!pais){
            return res.status(400).json({mensaje: "dato incorrecto pais"});
        }
        const resultado = await buscarUsuarioPorEmailModel(pais);

        if (resultado.length === 0) {
            return res.status(404).json({ mensaje: "usuarios no encontrado" });
        }

        return res.status(200).json({mensaje: "usuario encontrado", dato: resultado});
    } catch (error) {
        console.log("error en buscarUsuarioPorEmailController", error);
        res.status(500).json({mensaje: "error en sercidr controller-buscar-email"});
    }
}

//AMPLIAR LA VALIDACION O HACERLO MAS ADELANTE?
export const crearUsuarioController = async(req, res) =>{
    try{

        const {  nombre_usuario, email, password, biografia, pais } = req.body;
        const foto_perfil = req.file ? req.file.filename : null;


        if(!nombre_usuario || !email|| !password){
            return res.status(400).json({mensaje: "faltan datos"})
        }
        
        
        const hash = await bcrypt.hash(password, 10);
        const resultado = await crearUsuarioModel(nombre_usuario, email, hash, biografia || null, foto_perfil || null, pais || null);
        
        req.session.usuarioLogueado = {
            id:resultado.insertId,
            nombre: nombre_usuario,
            email: email
        }
        res.redirect("/");

    } catch(error){
        console.log("ERROR REGISTRO/crearUsuarioController:", error);
        res.status(500).json({mensaje: "error en el servidr"})
    }
}

export const editarUsuarioController = async(req, res) =>{
    try{
        const {idUsuario} = req.params; //mas a futuro modificar a session
        const {nombre, biografia, fotoPerfil, pais} = req.body;
        if(!idUsuario){
            return res.status(400).json({mensaje: "error, falta el idUsuario"});
        }

    await editarUsuarioModel(nombre, biografia, fotoPerfil, pais, idUsuario);
    return res.status(200).json({mensaje: "Usuario editado"});

    }catch(error){
        console.log("error en editarUsuarioController", error)
       return res.status(500).json({mensaje: "error en servidor/editarUsuarioController"});
    }
}
//nombre_usuario, estado
export const suspenderUsuarioODarDeAltaController = async(req, res) =>{
    try{
        const {nombre, estado} = req.body;
            if(!nombre || !estado){
                return res.status(400).json({mensaje: "faltan datos"})
            }
             console.log("error en suspender usuario controller salteif"); 
            await suspenderUsuarioODarDeAltaModel(nombre, estado);
            return res.status(200).json({mensaje: "estado de usuario modificado"});
    
    }catch(error){
        console.log("error en suspender usuario controller", error);
        return res.status(500).json({mensaje: "Error en el sercidor"})
    }

}

export const crearModeradorController = async (req, res) => {
    try {
        const { nombre_usuario } = req.body;
        if(!nombre_usuario){
            return res.status(400).json({mensaje: "falta el nombre"});
        }
        await crearModeradorModel(nombre_usuario);
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
        
        const usuarios = await buscarUsuarioPorNombreModel(nombre);
        if(usuarios.length === 0){
            return res.status(404).json({mensaje: "este usuario no existe"});
        }
        return res.status(200).json({mensaje: "Usuario encontrado", data: usuarios});

    } catch (error) {
        console.log("error en buscar usuario por nombre/controller", error);
        return res.status(500).json({mensaje: "error en el servidor"});
    }
}

export const cambiarContrasenaController = async(req, res) =>{
    try {
        const {idUsuario} = req.params; //pasar mas a delante a session
        const {contrasenaNueva} = req.body;

         if (!idUsuario || !contrasenaNueva) {
            return res.status(400).json({ mensaje: "Faltan datos" });
        }

        const hash = await bcrypt.hash(contrasenaNueva, 10);
        await cambiarContrasenaModel(idUsuario, hash);
        return res.status(200).json({ mensaje: "Contraseña actualizada" });
    } catch (error) {
        console.log("Error en cambiar contraseña controller", error);
        return res.status(500).json({mensaje: "error servidor controller cambiar contrasena"});
    }
}


export const verificarDatosInicioSesionUsuarioController = async (req, res) => {
    try {
        //se obtienen ls datos necesarios
        const { nombre, contrasena } = req.body;

        //se validan si estan ingresados
        if (!nombre || !contrasena) {
            return res.status(400).json({ mensaje: "Falta alguno de los datos" });
        }

        //se realiza la consulta para ver si el nombre existe, si no existe tira un error
        const usuarioEncontrado = await verificarExistenciaNombreUsuarioModel(nombre);

        if (!usuarioEncontrado) {
            return res.status(401).json({ mensaje: "Usuario o contraseña incorrectos" });
        }
        
        //se comparan ambas contraseñas, la primera en texto plano y la segunda es la hasheada
        const coinciden = await bcrypt.compare(contrasena, usuarioEncontrado.contrasena);

        //si no coinciden tira error
        if (!coinciden) {
            return res.status(401).json({ mensaje: "Usuario o contraseña incorrectos" });
        }

         req.session.usuarioLogueado = {id: usuarioEncontrado.id_usuario, nombre: usuarioEncontrado.nombre};

        return res.status(200).json({ mensaje: "Login exitoso", usuario: usuarioEncontrado.nombre });

    } catch (error) {
        console.log("error en verificarContrasenaUsuarioController", error);
        return res.status(500).json({ mensaje: "Error interno del servidor" });
    }
}



export const mostrarPaginaInicioController = async (req, res) => {
    //basicamente carga la pagina con publicaciones una vez se ingresa "/"
    try {
        //llama a la funcion que lista todas las publicaciones
        const publicaciones = await listarPublicacionesModel(); 
        res.render('index', {publicaciones: publicaciones, usuarioLogueado: req.session.usuarioLogueado || null });
    } catch (error) {
        console.error("Error al cargar la pagina:", error);
        res.status(500).send("Error al cargar la pagina");
    }
};
