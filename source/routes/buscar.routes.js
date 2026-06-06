import { Router } from 'express';
import { buscarPublicacionesController } from '../controllers/buscar.controller.js';

const router = Router();


router.get('/buscar', buscarPublicacionesController);

export default router;