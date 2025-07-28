const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class PlayerShow extends Model {}

PlayerShow.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false
    },
  },
  {
    sequelize,
    modelName: 'playerShow',
    timestamps: true
  }
);

module.exports = PlayerShow;