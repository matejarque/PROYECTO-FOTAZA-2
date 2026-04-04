import {registrarDenunciaController, contarDenunciasUnicasController, listarPublicacionesParaValidarController} from "../controllers/denuncias.controller.js";
import express from "express";

const Router = express.Router();

Router.post("/", registrarDenunciaController);
Router.get("/contar", contarDenunciasUnicasController);
Router.get("/listar", listarPublicacionesParaValidarController);


export default Router;