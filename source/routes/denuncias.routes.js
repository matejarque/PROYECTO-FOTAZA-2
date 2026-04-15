import {registrarDenunciaController, contarDenunciasUnicasController, listarPublicacionesParaValidarController} from "../controllers/denuncias.controller.js";
import express from "express";
import {esUsuarioRegistrado} from '../middlewares/auth.middleware.js'
const Router = express.Router();

Router.post("/", esUsuarioRegistrado, registrarDenunciaController);

//esta no debe de ser una ruta, si no el metodo para contar cuando se denuncia asi se quita la publicacion si llega a 3
//Router.get("/contar/:idPublicacion", contarDenunciasUnicasController);

//funciona
Router.get("/listar", listarPublicacionesParaValidarController);


export default Router;