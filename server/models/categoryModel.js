
const sequelize = require('../config/config.js');
const { DataTypes } = require('sequelize');
const subCategoryModel = require('./subCategoryModel.js');
const categoryModel = sequelize.define('categories', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

 categoryModel.hasMany(subCategoryModel, {  foreignKey: 'categoryId' });

module.exports = categoryModel;
