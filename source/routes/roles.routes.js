import express from "express";
import {crearNuevoRolController, listarRolesController} from "../controllers/roles.controller.js";
const router = express.Router();

router.get("/listar-roles/nombre", listarRolesController);
router.post("/crear", crearNuevoRolController);



export default router;