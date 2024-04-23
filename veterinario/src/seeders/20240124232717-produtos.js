const connection = require('../../connection');

module.exports = {
    up: async (queryInterface, Sequelize) => {

        await connection.sync();

      await queryInterface.bulkInsert('produtos', [
        {
          id: 3,
          nome: 'Ração de gato',
          descricao: 'Ração boa pra gato',
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ]);
    },
  
    down: async (queryInterface, Sequelize) => {
      await queryInterface.bulkDelete('produtos', null, {});
    },
  };