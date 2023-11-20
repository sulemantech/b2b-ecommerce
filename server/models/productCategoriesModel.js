
const sequelize = require('../database/db');
const { DataTypes } = require('sequelize');

const productCategoriesModel = sequelize.define('productCategories', {
  // You can add any additional fields if needed
  
});

module.exports = productCategoriesModel;
