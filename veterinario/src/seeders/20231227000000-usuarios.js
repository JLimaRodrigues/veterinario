const connection = require('../../connection');
const bcryptjs   = require('bcryptjs');

const salt = bcryptjs.genSaltSync();

module.exports = {
    up: async (queryInterface, Sequelize) => {

        await connection.sync();

      await queryInterface.bulkInsert('usuarios', [
        {
          nome: 'admin',
          nickname: 'admin',
          email: 'admin@admin.com',
          senha: bcryptjs.hashSync('1234', salt),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
            nome: 'teste',
            nickname: 'teste',
            email: 'teste@teste.com',
            senha: bcryptjs.hashSync('1234', salt),
            createdAt: new Date(),
            updatedAt: new Date(),
        }
      ]);
    },
  
    down: async (queryInterface, Sequelize) => {
      await queryInterface.bulkDelete('usuarios', null, {});
    },
  };