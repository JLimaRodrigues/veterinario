const express = require('express');
const route   = express.Router();
const upload  = require('./config/configMulter');

//controllers
const homeController    = require('./src/controllers/homeController');
const loginController   = require('./src/controllers/loginController');
const menuController    = require('./src/controllers/menuController');
const usuarioController = require('./src/controllers/usuarioController');
const produtoController =  require('./src/controllers/produtoController');
const servicoController = require('./src/controllers/servicoController');
const apiController     = require('./src/controllers/apiController');

//middlewares
const { loginRequired } = require('./src/middlewares/middleware');

//rotas da home
route.get('/', homeController.index);
route.get('/listaDeProdutos', homeController.produtos);
route.get('/listaDeServicos', homeController.servicos);

//rotas de administração
route.get('/menu', menuController.index);

//rotas de login
route.get('/login', loginController.index);
route.post('/login/logar', loginController.logar);
route.get('/logout', loginController.logout);

//rotas de usuarios
route.get('/usuario', loginRequired, usuarioController.index);
route.get('/usuario/novo', loginRequired, usuarioController.criar);
route.post('/usuario/registrar', loginRequired, usuarioController.registrar);
route.get('/usuario/editar/:id', loginRequired, usuarioController.editar);
route.post('/usuario/atualizar/:id', loginRequired, usuarioController.atualizar);
route.get('/usuario/excluir/:id', loginRequired, usuarioController.excluir);
route.post('/usuario/deletar/:id', loginRequired, usuarioController.deletar);

//rotas de produtos
route.get('/produtos', loginRequired, produtoController.index);
route.get('/produtos/novo', loginRequired, produtoController.criar);
route.post('/produtos/registrar', loginRequired, upload.any("imagemProduto"), produtoController.registrar);
route.get('/produtos/editar/:id', loginRequired, produtoController.editar);
//route.post('/produtos/atualizar/:id', loginRequired, produtoController.deletar);
route.get('/produtos/excluir/:id', loginRequired, produtoController.excluir);
route.post('/produtos/deletar/:id', loginRequired, produtoController.deletar);

//rotas de serviços
route.get('/servicos', loginRequired, servicoController.index);

//rotas da api
route.get('/api/usuarios', function(req, res){
    const usuarios = [
        {nome: 'Jefferson', idade: 23, profissao: 'Militar'},
        {nome: 'Danilo', idade: 24, profissao: 'Militar'},
        {nome: 'Darlinton', idade: 26, profissao: 'Civil'},
    ];

    res.json(usuarios);
});

route.get('/api/times', apiController.times);
route.get('/api/produtos', apiController.produtos);
route.post('/api/localizacao', apiController.localizacao);
route.get('/api/buscarLocalizacoesProximas', apiController.buscarLocalizacoesProximas);

module.exports = route;