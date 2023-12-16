const Usuario = require('../models/UsuarioModel');

exports.index = async (req, res) => {
    const usuarios = await Usuario.buscaUsuarios();

    res.render('administracao/usuarios/index', { usuarios });
}

exports.modalNovo = (req, res) => {
    res.render('administracao/usuarios/usuario');
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
        console.log(e);
        return res.render('404');
    }
};