import {editarMotivoDenunciaController, listarMotivoDenunciaController, crearMotivoDenunciaController} from "../controllers/motivos_denuncia.controller.js";
import expres from "express";

const router = expres.Router();

router.get("/listar-motivos", listarMotivoDenunciaController);
router.post("/crear-motivo", crearMotivoDenunciaController);

//no funciona, no lo voy a solucionar ahora, este no es imprtante
router.put("/editar-motivo", editarMotivoDenunciaController);
export default router;
