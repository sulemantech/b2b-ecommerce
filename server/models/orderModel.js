const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');
const registerationModel = require('./registerationModel');
const orderItemsModel = require('./orderItemsModel');

const orderModel = sequelize.define('orders', {
  orderId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: registerationModel, // Replace with your actual RegistrationModel
      key: 'id',
    },
  },
  address: {
    type: DataTypes.STRING,
  },
  orderDate: {
    type: DataTypes.DATE,
  },
  totalPrice: {
    type: DataTypes.DECIMAL(10, 2),
  },
  status: {
    type: DataTypes.STRING,
  },
  discount: {
    type: DataTypes.INTEGER,
  },
  paymentMethod: {
    type: DataTypes.STRING,
  },
  trackingNumber: {
    type: DataTypes.INTEGER,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  contactNumber: {
    type: DataTypes.INTEGER, // Assuming it's a large integer
    allowNull: false,
  },
  zipCode: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  additionalInfo: {
    type: DataTypes.STRING,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  country: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

orderModel.belongsTo(registerationModel, { foreignKey: 'userId' }); // Establishing the foreign key relationship
orderModel.hasMany(orderItemsModel, { foreignKey: 'orderId' });
module.exports = orderModel;
