exports.index = (req, res) => {
    res.render('administracao/produtos/index');
}

exports.criar = (req, res) => {
    res.render('administracao/produtos/form/novoProduto');
}

exports.registrar = (req, res) => {
    res.send(req.body);
}