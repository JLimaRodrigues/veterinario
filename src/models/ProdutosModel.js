const { Model, DataTypes } = require('sequelize');
const connection = require('../../connection');
const path       = require('path');
const fs         = require('fs');

//tabela de Imagens do produto
const ImagemProduto = connection.define('imagensProdutos', {
  idImagem: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  caminhoImagem: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

//tabela de Produtos
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

        this.produto = await ProdutoSchema.create(this.body);

        //crie as imagens associadas ao produto
        if(this.body.imagens && this.body.imagens.length > 0 ){
          const imagens = this.body.imagens.map( imagem => ({ caminhoImagem: imagem, produtoId: this.produto.id }));
          await ImagemProduto.bulkCreate(imagens, { individualHooks: true, returning: true });
        }
    }
  
    async editar(id) {
      if (typeof id !== 'string') return;
      this.valida();
      if (this.errors.length > 0) return;
      await ProdutoSchema.update(this.body, { 
        where: { id },
        include: ImagemProduto 
      });
      this.produto = await ProdutoSchema.findByPk(id, ImagemProduto);
    }
  
    valida() {
      this.cleanUp();
  
      // Validação
      if (!this.body.nome) this.errors.push('Nome é um campo obrigatório');
      if (!this.body.descricao) this.errors.push('Descrição é um campo obrigatório');
      if (!this.body.imagens) this.errors.push('Pelo menos uma imagem é necessária no produto');
    }
  
    cleanUp() {
        for(const key in this.body){

            if (Array.isArray(this.body[key]) && this.body[key].length > 0) {
              this.body[key] = this.body[key].map((element) => (typeof element !== 'string' ? '' : element));
            } else if (typeof this.body[key] !== 'string') {
              this.body[key] = '';
            }
        }

        this.body = {
            nome: this.body.nome,
            descricao: this.body.descricao,
            imagens: this.body.imagens
        }
    }
  
    // Métodos estáticos
    static async buscaPorId(id) {
      if (typeof id !== 'string') return;
      const produto = await ProdutoSchema.findByPk(id, {
        include: [
          {
              as: "imagens",
              model: ImagemProduto
      }]} );
      return produto;
    }
  
    static async deletar(id) {
      if (typeof id !== 'string') return;
      const produto = await ProdutoSchema.findByPk(id, {
        include: [
          {
              as: "imagens",
              model: ImagemProduto
          }
        ]}
      );
    
      if (!produto) return;

      for(const imagem of produto.imagens ){
        const caminhoImagem = path.join(__dirname, '..', '..', 'public', 'assets', 'images', 'produtos', imagem.caminhoImagem);
        if (fs.existsSync(caminhoImagem)) {
          fs.unlinkSync(caminhoImagem);
        } else {
          return;
        }
      }
      
      await ProdutoSchema.destroy({ where: { id }});
    
      // Retorna o produto após a exclusão bem-sucedida
      return produto;
    }
  
    static async buscaProdutos() {
      try {
          const produtos = await ProdutoSchema.findAll({
              order: [['createdAt', 'DESC']],
                include: [
                  {
                      as: "imagens",
                      model: ImagemProduto
                  }]
          });
          return produtos;
      } catch (error) {
          throw error;
      }
  }
  }

ProdutoSchema.hasMany(ImagemProduto, { foreignKey: 'produtoId', as: 'imagens', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
ImagemProduto.belongsTo(ProdutoSchema, { foreignKey: 'produtoId' });

module.exports = Produto;