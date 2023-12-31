const { Model, DataTypes } = require('sequelize');
const connection = require('../../connection');

const ProdutoSchema = connection.define('produtos', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descricao: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  imagem: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: ''
  }
});


class Produto {
    constructor(body) {
      this.body = body;
      this.errors = [];
      this.produto = null;
    }

    async registrar(){
        this.valida();
        if(this.errors.length > 0 ) return;

        this.usuario = await ProdutoSchema.create(this.body);
    }
  
    async editar(id) {
      if (typeof id !== 'string') return;
      this.valida();
      if (this.errors.length > 0) return;
      await ProdutoSchema.update(this.body, { where: { id } });
      this.produto = await ProdutoSchema.findByPk(id);
    }
  
    valida() {
      this.cleanUp();
  
      // Validação
      if (!this.body.nome) this.errors.push('Nome é um campo obrigatório');
      if (!this.body.descricao) this.errors.push('Descrição é um campo obrigatório');
    }
  
    cleanUp() {
        for(const key in this.body){
            if (typeof this.body[key] !== 'string'){
                this.body[key] = '';
            }
        }

        this.body = {
            nome: this.body.nome,
            descricao: this.body.descricao,
            imagem: this.body.imagem
        }
    }
  
    // Métodos estáticos
    static async buscaPorId(id) {
      if (typeof id !== 'string') return;
      const produto = await ProdutoSchema.findByPk(id);
      return produto;
    }
  
    static async deletar(id) {
      if (typeof id !== 'string') return;
      const produto = await ProdutoSchema.destroy({ where: { id } });
      return produto;
    }
  
    static async buscaUsuarios() {
      try {
          const produtos = await ProdutoSchema.findAll({
              order: [['createdAt', 'DESC']]
          });
          return produtos;
      } catch (error) {
          throw error;
      }
  }
  }

module.exports = Produto;