import express from 'express';
import controller from '../controller/user.controller.js';
import { validId, validUser } from '../middleware/global.middlewares.js'

const route = express.Router();

route.post("/", controller.create);
route.get("/", controller.findAll);
route.get("/:id", validId, validUser, controller.findById);
route.patch("/:id", validId, validUser, controller.update);

export default route;
