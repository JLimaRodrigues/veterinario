const express = require('express');
const route   = express.Router();

const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');
const menuController  = require('./src/controllers/menuController');
const usuarioController = require('./src/controllers/usuarioController');

//rotas da home
route.get('/', homeController.index);

//rotas de administração
route.get('/menu', menuController.index);

//rotas de login
route.get('/login', loginController.index);
route.post('/login/logar', loginController.logar);
route.get('/logout', loginController.logout);

//rotas de usuarios
route.get('/usuario', loginRequired, usuarioController.index);
route.get('/usuario/novo', loginRequired, usuarioController.modalNovo);
route.post('/usuario/registrar', loginRequired, usuarioController.registrar);

//rotas de produtos

//rotas de serviços

module.exports = route;