const Produto     = require('../models/ProdutosModel');
const Localizacao = require('../models/LocalizacaoModel');

exports.times = (req, res) => {
    const times = [
        {nome: 'flamengo'},
        {nome: 'Vasco'},
        {nome: 'Botafogo'},
    ];

    res.json(times);
}

exports.produtos = async (req, res) => {
    const produtos = await Produto.buscaProdutos();

    res.json(produtos);
}

exports.localizacao = async (req, res) => {
    try {
        const { userId, animalType, observations, latitude, longitude } = req.body;

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

//método responsável por atualizar avistamentos
exports.atualizar = async (req, res) => {
    const { id } = req.params; // ID da localização a ser atualizada
    const { animalType, observations, latitude, longitude } = req.body;

    try {
        await Localizacao.update({animalType, observations}, { where: { id } });
        const localizacao = await Localizacao.findByPk(id);

        if (!localizacao) {
        return res.status(404).json({ error: 'Localização não encontrada' });
        }

        return res.status(200).json({ message: 'Localização atualizada com sucesso', localizacao });
    } catch (error) {
        console.error('Erro ao atualizar localização:', error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

//método responsável por excluir localização
exports.excluir = async (req, res) => {
    const { id } = req.params;
    
    try {
        const localizacao = await Localizacao.findByPk(id);

        if (!localizacao) {
         return res.status(404).json({ error: 'Localização não encontrada' });
        }

        await Localizacao.destroy({ where: { id } })

        return res.status(200).json({ message: 'Localização excluída com sucesso', localizacao });
    } catch (error) {
        console.error('Erro ao atualizar localização:', error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
}