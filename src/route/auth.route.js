import { Router } from 'express';
import controller from '../controller/auth.controller.js';
const router = Router();

router.post("/", controller.login);

export default router;