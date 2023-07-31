import incidentController from "../controller/incident.controller.js";
import { Router } from 'express';
import {authMiddleware} from '../middleware/auth.middleware.js';

const router = Router();

router.get('/last', incidentController.last);
router.post('/', authMiddleware, incidentController.create);
router.get('/', incidentController.findAll);
router.get('/:id', incidentController.findById);
router.patch('/:id', incidentController.update);


export default router;

