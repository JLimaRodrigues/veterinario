const { Model, DataTypes } = require('sequelize');
const connection = require('../../connection');
const bcryptjs   = require('bcryptjs');

const UsuarioSchema = connection.define('usuarios', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  nickname: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: ''
  },
  email: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: ''
    },
  senha: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

//class Usuario extends Model {
class Usuario {
    constructor(body) {
      this.body = body;
      this.errors = [];
      this.usuario = null;
    }

    async logar(){
      //this.valida();
      //if(this.errors.length > 0 ) return;

      this.usuario = (await UsuarioSchema.findOne({ where: { email: this.body.email }}))?.dataValues ?? null ;

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

        const salt = bcryptjs.genSaltSync();
        this.body.senha = bcryptjs.hashSync(this.body.senha, salt);

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
            nickname: this.body.nickname,
            email: this.body.email,
            senha: this.body.senha
        }
    }
  
    // Métodos estáticos
    static async buscaPorId(id) {
      if (typeof id !== 'string') return;
      const usuario = await UsuarioSchema.findByPk(id);
      return usuario;
    }
  
    static async deletar(id) {
      if (typeof id !== 'string') return;
      const usuario = await UsuarioSchema.destroy({ where: { id } });
      return usuario;
    }
  
    static async buscaUsuarios() {
      try {
          const usuarios = await UsuarioSchema.findAll({
              order: [['createdAt', 'DESC']]
          });
          return usuarios;
      } catch (error) {
          throw error;
      }
  }
  }

module.exports = Usuario;