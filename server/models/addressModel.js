// models/addressModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');
const stateModel = require('./stateModel');
const addressModel = sequelize.define('address', {
  
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  stateId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: stateModel,
      key: 'stateId',
    },
  },
  zipCode: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  country: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = addressModel;
