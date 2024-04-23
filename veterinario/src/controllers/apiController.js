const Localizacao = require('../models/LocalizacaoModel');

exports.times = (req, res) => {
    const times = [
        {nome: 'flamengo'},
        {nome: 'Vasco'},
        {nome: 'Botafogo'},
    ];

    res.json(times);
}

exports.produtos = (req, res) => {
    const produtos = [
        {nome: "Camisa do flamengo", valorEmReais: 159.99, tamanhos: ['XG', 'GG', 'G', 'M', 'P']},
        {nome: "Camisa do Vasco", valorEmReais: 159.99, tamanhos: ['XG', 'GG', 'G', 'M', 'P']},
        {nome: "Camisa do fluminense", valorEmReais: 159.99, tamanhos: ['XG', 'GG', 'G', 'M', 'P']},
        {nome: "Camisa do botafogo", valorEmReais: 159.99, tamanhos: ['XG', 'GG', 'G', 'M', 'P']},
    ];

    res.json(produtos);
}

exports.localizacao = async (req, res) => {
    try {
        const { userId, animalType, observations, latitude, longitude } = req.body;
        // const localizacao = {
        //     userId,
        //     animalType,
        //     observations,
        //     latitude,
        //     longitude
        // };

        const novaLocalizacao = Localizacao.create({
            userId,
            animalType,
            observations,
            latitude,
            longitude
        });

        res.status(201).json(novaLocalizacao)
    } catch (error) {
        res.status(500).send('Erro ao salvar avistamento');
    }
}

exports.buscarLocalizacoesProximas = async (req, res) => {
    try {
      const { latitude, longitude } = req.query;
  
      // Por exemplo, buscar localizações dentro de um raio de 5 km
      const localizacoes = await Localizacao.findAll({});
  
      res.status(200).json(localizacoes);
    } catch (error) {
      console.error('Erro ao buscar localizações:', error);
      res.status(500).send('Erro ao buscar localizações');
    }
  };