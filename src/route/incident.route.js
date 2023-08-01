import incidentController from "../controller/incident.controller.js";
import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = Router();

router.post('/', authMiddleware, incidentController.create);
router.get('/last', incidentController.last);
router.get('/search', incidentController.searchByTitle);
router.get('/byUser', authMiddleware, incidentController.byUser);

router.get('/', incidentController.findAll);
router.get('/:id', authMiddleware, incidentController.findById);
router.patch('/:id', authMiddleware, incidentController.update);


export default router;

