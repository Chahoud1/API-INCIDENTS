// aqui ficam somente as rotas

import express from 'express';
import userController from '../controller/user.controller.js';
import {validId, validUser} from '../middleware/global.middlewares.js'

const route = express.Router();

route.post("/", userController.create);
route.get("/", userController.findAll);
route.get("/:id", validId, validUser, userController.findById);
route.patch("/:id", validId, validUser, userController.update);

export default route;
