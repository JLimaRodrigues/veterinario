const Usuario = require('../models/UsuarioModel');
const ErrorHandler = require('../models/errorHandler');

//método responsável por retornar o index dos usuários
exports.index = async (req, res) => {
    const usuarios = await Usuario.buscaUsuarios();

    res.render('administracao/usuarios/index', { usuarios });
}

//método responsável por retornar a página de criar usuários
exports.criar = (req, res) => {
    res.render('administracao/usuarios/form/novoUsuario');
}

//método responsável por criar usuário no banco de dados
exports.registrar = async (req, res) => {
    try {

        const usuario = new Usuario(req.body);
        await usuario.registrar();

        if(usuario.errors.length > 0){
            req.session.save(() => req.redirect('/'));
            return;
        }

        req.flash('success', 'Seu usuário foi criado com sucesso.');
        req.session.save(() => res.redirect(req.get('referer')));
        return;
    } catch(e){
        ErrorHandler.logAndRenderError(e, res, '404');
    }
};

//método responsável por retornar a view de editar dados do usuário
exports.editar = async (req, res) => {
    try {
        if(!req.params.id) return res.render('404');

        const usuario = await Usuario.buscaPorId(req.params.id);
    
        if(!usuario) return res.render('404');
    
        res.render('administracao/usuarios/form/editarUsuario', { usuario });
    } catch(e){
        ErrorHandler.logAndRenderError(e, res, '404');
    }
};

//método responsável por atualizar dados do usuário
exports.atualizar = async (req, res, next) => {
    try {
        if(!req.params.id) return res.render('404');
        const usuario = new Usuario(req.body);
        await usuario.editar(req.params.id)
    
        if(usuario.errors.length > 0){
            req.flash('errors', usuario.errors);
            req.session.save(() => res.redirect(req.get('referer')));
            return;
        }
    
        req.flash('success', 'Contato editado com sucesso.');
        req.session.save(() => res.redirect(req.get('referer')));
        return;
    } catch(e){
        ErrorHandler.logAndRenderError(e, res, '404');
    }
};

//método responsável por retornar dados para view de exclusão do usuário
exports.excluir  = async (req, res) => {
    try {
        if(!req.params.id) return res.render('404');

        const usuario = await Usuario.buscaPorId(req.params.id);

        if(!usuario) return res.render('404');
    
        res.render('administracao/usuarios/form/excluirUsuario', { usuario });

    } catch(e){
        ErrorHandler.logAndRenderError(e, res, '404');
    }
}

//método responsável por excluir usuário do banco
exports.deletar = async (req, res) => {
    try {
        if(!req.params.id) return res.render('404');

        const usuario = await Usuario.deletar(req.params.id);

        if(!usuario) return res.render('404');

        req.flash('success', 'Usuário apagado com sucesso');
        res.redirect(req.get('referer'));
    } catch(e){
        ErrorHandler.logAndRenderError(e, res, '404');
    }
}