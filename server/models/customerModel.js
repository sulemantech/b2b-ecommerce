// customerModel.js
const sequelize = require('../database/db');
const { DataTypes } = require('sequelize');

const customerModel = sequelize.define('customer', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  contactNumber: {
    type: DataTypes.INTEGER,
  },
});

module.exports = customerModel;
