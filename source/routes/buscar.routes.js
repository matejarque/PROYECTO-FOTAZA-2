import { Router } from 'express';
import { buscarPublicaciones } from '../controllers/buscar.controller.js';

const router = Router();


router.get('/buscar', buscarPublicaciones);

export default router;