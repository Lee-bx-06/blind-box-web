const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class BlindBox extends Model {}

BlindBox.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false
    },
    items: {
      type: DataTypes.JSON,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'blindBox'
  }
);

module.exports = BlindBox;