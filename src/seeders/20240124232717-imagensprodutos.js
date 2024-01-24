const connection = require('../../connection');

module.exports = {
    up: async (queryInterface, Sequelize) => {

        await connection.sync();

      await queryInterface.bulkInsert('imagensprodutos', [
        {
          idImagem: 4,
          caminhoImagem: '1706138210122-whiskas.png',
          produtoId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ]);
    },
  
    down: async (queryInterface, Sequelize) => {
      await queryInterface.bulkDelete('imagensprodutos', null, {});
    },
  };