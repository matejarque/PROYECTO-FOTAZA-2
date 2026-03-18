import express from "express";
import { registroUsuario } from "../controllers/usuario.controller.js";

const router = express.Router();

router.post("/registro", registroUsuario);

export default router;