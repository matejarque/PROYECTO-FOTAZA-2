import {editarMotivoDenunciaController, listarMotivoDenunciaController, crearMotivoDenunciaController} from "../controllers/motivos_denuncia.controller.js";
import expres from "express";

const router = expres.Router();

router.get("/listar-motivos", listarMotivoDenunciaController);
router.post("/crear-motivo", crearMotivoDenunciaController);
router.put("/editar-motivo", editarMotivoDenunciaController);
export default router;
