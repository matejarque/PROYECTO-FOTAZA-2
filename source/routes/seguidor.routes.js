import express from 'express';
import {seguirController, dejarDeSeguirController} from '../controllers/seguidor.controller.js';
const router = express.Router();

router.post("/seguir", seguirController);
router.put("/dejar-seguir", dejarDeSeguirController);


export default router;