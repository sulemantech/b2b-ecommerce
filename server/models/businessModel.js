const sequelize = require('../database/db');
const { DataTypes } = require('sequelize');
const registerationModel = require('./registerationModel');

const businessModel = sequelize.define('business', {
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
    },
    contactNumber: {
      type: DataTypes.INTEGER,
    },
    description: {
      type: DataTypes.TEXT,
    },
   
  });
  

 
  module.exports = businessModel;
  
