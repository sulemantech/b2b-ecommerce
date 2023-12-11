const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');
const registerationModel = require('./registerationModel');
const orderItemsModel = require('./orderItemsModel');

const orderModel = sequelize.define('orders', {
  orderId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    // allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    // allowNull: false,
    references: {
      model: registerationModel,
      key: 'id',
    },
  },
  address: {
    type: DataTypes.STRING,
    // allowNull: false,
  },
  orderDate: {
    type: DataTypes.DATE,
    // allowNull: false,
  },
  totalPrice: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    // allowNull: false,
  },
  discount: {
    type: DataTypes.INTEGER,
    // allowNull: true,
  },
  paymentMethod: {
    type: DataTypes.STRING,
    // allowNull: false,
  },
  trackingNumber: {
    type: DataTypes.INTEGER,
    // allowNull: true,
  },
});

orderModel.belongsTo(registerationModel, { foreignKey: 'userId' }); // Establishing the foreign key relationship
orderModel.hasMany(orderItemsModel, { foreignKey: 'orderId' });
module.exports = orderModel;
