const Produto      = require('../models/ProdutosModel');
const ErrorHandler = require('../models/ErrorHandler');

exports.index = async (req, res) => {
    const produtos = await Produto.buscaProdutos();

    res.render('administracao/produtos/index', { produtos });
}

exports.criar = (req, res) => {
    res.render('administracao/produtos/form/novoProduto');
}

exports.registrar = (req, res) => {
    try {
        //req.body.imagem = req.files.filename;
        const files = req.files;
        req.body.imagens  = [];

        for(const file of Object.values(files)){
            const { filename } = file;

            req.body.imagens.push(filename);
        }

        const produto  = new Produto(req.body);
        produto.registrar();

        if(produto.errors.length > 0){
            req.flash('errors', produto.errors);
            req.session.save(() => res.redirect('/produtos'));
            return;
        }

        req.flash('success', 'Seu produto foi criado com sucesso.');
        req.session.save(() => res.redirect(req.get('referer')));
        return;
    } catch(e){
        ErrorHandler.logAndRenderError(e, res, '404');
    }
}

exports.editar  = async (req, res) => {
    try {

        if(!req.params.id) return res.render('404');

        const produto = await Produto.buscaPorId(req.params.id);

        if(!produto) return res.render('404');

        const imagens = produto.imagens;

        res.render('administracao/produtos/form/editarProduto', { produto, imagens })

    } catch(e){
        ErrorHandler.logAndRenderError(e, res, '404');
    }
}

exports.excluir  = async (req, res) => {
    try {
        if(!req.params.id) return res.render('404');

        const produto = await Produto.buscaPorId(req.params.id);

        if(!produto) return res.render('404');
    
        res.render('administracao/produtos/form/excluirProduto', { produto });

    } catch(e){
        ErrorHandler.logAndRenderError(e, res, '404');
    }
}

exports.deletar = async (req, res) => {
    try {
        if(!req.params.id) return res.render('404');

        const produto = await Produto.deletar(req.params.id);

        if(!produto) return res.render('404');

        req.flash('success', 'Produto apagado com sucesso');
        res.redirect(req.get('referer'));
    } catch(e){
        ErrorHandler.logAndRenderError(e, res, '404');
    }
}