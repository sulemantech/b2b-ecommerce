const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');
const orderModel = require('./orderModel');
const productModel = require('./productModel');

const orderItemsModel = sequelize.define('orderItems', {
  orderItemId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  orderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: orderModel,
      key: 'orderId',
    },
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: productModel,
      key: 'id',
    },
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

orderItemsModel.belongsTo(orderModel, { foreignKey: 'orderId' });
orderItemsModel.belongsTo(productModel, { foreignKey: 'productId' });

module.exports = orderItemsModel;
