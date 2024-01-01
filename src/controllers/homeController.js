const Produto = require('../models/ProdutosModel');
const Servicos = require('../models/ServicosModel');
const ErrorHandler = require('../models/ErrorHandler');

exports.index = (req, res) => {
    res.render('index');
}

exports.produtos = async (req, res) => {
    const produtos = await Produto.buscaProdutos();

    res.render('produtos', { produtos });
}

exports.servicos = (req, res) => {
    res.render('servicos');
}