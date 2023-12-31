const { Model, DataTypes } = require('sequelize');
const connection = require('../../connection');

const ServicoSchema = connection.define('servicos', {
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
    allowNull: true,
    defaultValue: ''
  },
  imagem: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: ''
    }
});

class Servicos {
    constructor(body) {
      this.body = body;
      this.errors = [];
      this.usuario = null;
    }

    async logar(){
      //this.valida();
      //if(this.errors.length > 0 ) return;

      this.usuario = (await ServicoSchema.findOne({ where: { email: this.body.email }}))?.dataValues ?? null ;

      if(!this.usuario) { 
          this.errors.push('O usuário não existe.');
          return;
      }

      if(!bcryptjs.compareSync(this.body.senha, this.usuario.senha)){
          this.errors.push('Senha inválida');
          this.usuario = null;
          return;
      }
  }

    async registrar(){
        this.valida();
        if(this.errors.length > 0 ) return;

        this.usuario = await UsuarioSchema.create(this.body);
    }
  
    async editar(id) {
      if (typeof id !== 'string') return;
      this.valida();
      if (this.errors.length > 0) return;
      await UsuarioSchema.update(this.body, { where: { id } });
      this.usuario = await UsuarioSchema.findByPk(id);
    }
  
    valida() {
        //this.cleanUp();
  
      // Validação
      if (!this.body.nome) this.errors.push('Nome é um campo obrigatório');
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
      const servico = await ServicoSchema.findByPk(id);
      return servico;
    }
  
    static async deletar(id) {
      if (typeof id !== 'string') return;
      const servico = await ServicoSchema.destroy({ where: { id } });
      return servico;
    }
  
    static async buscaServicos() {
      try {
          const servicos = await ServicoSchema.findAll({
              order: [['createdAt', 'DESC']]
          });
          return servicos;
      } catch (error) {
          throw error;
      }
  }
  }

module.exports = Servicos;