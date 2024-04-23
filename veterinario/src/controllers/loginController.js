const Usuario = require('../models/UsuarioModel');

exports.index = (req, res) => {
    res.render('login');
};

exports.logar = async (req, res) => {
    try {

        const login = new Usuario(req.body);
        await login.logar();

        if(login.errors.length > 0){
            req.flash('errors', login.errors);
            req.session.save(() => res.redirect(req.get('referer')));
            return;
        }

        req.flash('success', 'Você logou no sistema.');
        req.session.usuario = login.usuario;
        req.session.save(() => res.redirect('/menu'));
        return;

    } catch(e){
        console.log(e);
        return res.render('404');
    }
};

exports.logout = (req, res) => {
    req.session.destroy();
    res.redirect('/');
    return;
}