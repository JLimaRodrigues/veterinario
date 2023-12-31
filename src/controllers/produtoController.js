const Produto      = require('../models/ProdutosModel');
const ErrorHandler = require('../models/errorHandler');

exports.index = (req, res) => {
    res.render('administracao/produtos/index');
}

exports.criar = (req, res) => {
    res.render('administracao/produtos/form/novoProduto');
}

exports.registrar = (req, res) => {
    try {
        req.body.imagem = req.file.filename;
        const produto  = new Produto(req.body);
        produto.registrar();

        if(produto.errors.length > 0){
            req.flash('errors', produto.errors);
            req.session.save(() => req.redirect(req.get('referer')));
            return;
        }

        req.flash('success', 'Seu produto foi criado com sucesso.');
        req.session.save(() => res.redirect(req.get('referer')));
        return;
    } catch(e){
        ErrorHandler.logAndRenderError(e, res, '404');
    }
}