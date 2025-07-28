const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Order extends Model {}

Order.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    blindBoxId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    blindBoxName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    item: {
      type: DataTypes.JSON,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('pending', 'processing', 'completed', 'canceled'),
      defaultValue: 'completed'
    }
  },
  {
    sequelize,
    modelName: 'order',
    timestamps: true
  }
);

module.exports = Order;