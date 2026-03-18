import express from "express";
import { registroUsuario, editarUsuarios } from "../controllers/usuario.controller.js";

const router = express.Router();

router.post("/registro", registroUsuario);
router.put("/actualizar", editarUsuarios)

export default router;