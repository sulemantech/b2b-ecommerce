
const sequelize = require('../config/config.js');
const { DataTypes } = require('sequelize');

const categoryModel = sequelize.define('categories', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = categoryModel;
