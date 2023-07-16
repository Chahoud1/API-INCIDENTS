// aqui ficam somente as rotas

const route = require('express').Router();
const userController = require('../controllers/user.controller');

route.post("/create", userController.create);


module.exports = route;