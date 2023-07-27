import incidentController from "../controller/incident.controller.js";
import {Router} from 'express';

const router = Router();

router.post('/', incidentController.create);
router.get('/', incidentController.findAll);
router.get('/:id', incidentController.findById);
router.patch('/:id', incidentController.update);

export default router;