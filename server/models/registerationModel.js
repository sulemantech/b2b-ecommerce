const sequelize = require('../database/db');
const { DataTypes } = require('sequelize');

const registerationModel = sequelize.define('user', {
      id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
      firstname: {
        type: DataTypes.STRING,
        // allowNull: false,
        unique: true,
      },
      lastname: {
        type: DataTypes.STRING,
        // allowNull: false,
        // unique: true,
      },
      email: {
        type: DataTypes.STRING,
        // allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        // allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
      },
      contactNumber: {
        type: DataTypes.INTEGER,
      },
      businessName: {
        type: DataTypes.STRING,
      },
      role: {
        type: DataTypes.STRING, 
        defaultValue: 'user', 
      }
});

module.exports =  registerationModel;