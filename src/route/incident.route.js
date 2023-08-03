import controller from "../controller/incident.controller.js";
import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/last', controller.last);
router.get('/search', controller.searchByTitle);
router.get('/byUser', authMiddleware, controller.byUser);

router.get('/', controller.findAll);
router.get('/:id', authMiddleware, controller.findById);

router.post('/', authMiddleware, controller.create);

router.patch('/comment/:id', authMiddleware, controller.addComment);
router.patch('/comment/:incidentId/:commentId', authMiddleware, controller.deleteComment);
router.patch('/:id', authMiddleware, controller.update);

export default router;