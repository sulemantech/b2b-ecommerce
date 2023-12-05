
const sequelize = require('../database/db');
const { DataTypes } = require('sequelize');
const citiesModel = require('./citiesModel');

const stateModel = sequelize.define('state', {
  stateName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  stateCode: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  stateId:{
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  }
});


stateModel.hasMany(citiesModel, {
  foreignKey: 'stateId',
  onDelete: 'CASCADE',
});

module.exports = stateModel;
