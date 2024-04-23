const { Model, DataTypes } = require('sequelize');
const connection = require('../../connection');

const Localizacao = connection.define('Localizacao', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  animalType: {
    type: DataTypes.STRING,
    allowNull: false
  },
  observations: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  latitude: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  longitude: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
});

module.exports = Localizacao;