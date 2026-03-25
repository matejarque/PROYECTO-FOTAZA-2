import router from 'express';
const router = express.Router();
import {buscarOCrearEtiquetaController, listarEtiquetasPopularesController} from '../controllers/etiquetas.controller.js'


router.post("/buscar-crear", buscarOCrearEtiquetaController);
router.get("/listar", listarEtiquetasPopularesController);




export default router;