const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');
const orderModel = require('./orderModel');
const productModel = require('./productModel');

const orderItemsModel = sequelize.define('orderItems', {
  id: {
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
      // allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      // allowNull: false,
    },
    discount: {
      type: DataTypes.FLOAT,
      // allowNull: false,
    },
    totalPrice: {
      type: DataTypes.FLOAT, // or DataTypes.DECIMAL
      // allowNull: false,
    },
    vendorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
});

orderItemsModel.belongsTo(productModel, { foreignKey: 'productId' });

module.exports = orderItemsModel;
