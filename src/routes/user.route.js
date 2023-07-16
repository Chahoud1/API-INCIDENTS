// aqui ficam somente as rotas

const route = require('express').Router();
const userController = require('../controllers/user.controller');

route.get("/user", userController.soma);


module.exports = route;