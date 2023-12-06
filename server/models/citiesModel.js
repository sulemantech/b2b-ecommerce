
// models/city.js
const sequelize = require('../database/db');
const { DataTypes } = require('sequelize');
const stateModel = require('./stateModel.js');

const citiesModel = sequelize.define('cities', {
  cityName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  stateId:{
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'states', // This should be the name of the products table
      key: 'stateId', // Reference the id column in the products table
    },
  }
});


module.exports = citiesModel;