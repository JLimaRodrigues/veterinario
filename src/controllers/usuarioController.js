const Usuario = require('../models/UsuarioModel');
const ErrorHandler = require('../models/errorHandler');

exports.index = async (req, res) => {
    const usuarios = await Usuario.buscaUsuarios();

    res.render('administracao/usuarios/index', { usuarios });
}

exports.modalNovo = (req, res) => {
    res.render('administracao/usuarios/usuario', { contato: {} });
}

exports.registrar = async (req, res) => {
    try {

        const usuario = new Usuario(req.body);
        await usuario.registrar();

        if(usuario.errors.length > 0){
            req.session.save(() => req.redirect('/'));
            return;
        }

        req.flash('success', 'Seu usuário foi criado com sucesso.');
        req.session.save(() => res.redirect('/usuario/novo'));
        return;
    } catch(e){
        ErrorHandler.logAndRenderError(e, res, '404');
    }
};

exports.editar = async (req, res) => {
    try {
        if(!req.params.id) return res.render('404');

        const usuario = await Usuario.buscaPorId(req.params.id);
    
        if(!usuario) return res.render('404');
    
        res.render('administracao/usuarios/usuario', { usuario });
    } catch(e){
        ErrorHandler.logAndRenderError(e, res, '404');
    }
};

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

exports.excluir  = (req, res) => {

}

exports.deletar = (req, res) => {
    
}