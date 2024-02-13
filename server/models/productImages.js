const sequelize = require('../database/db');
const { DataTypes } = require('sequelize');

const productImages = sequelize.define('productImages', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  images: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
  },
  productId: { // Change the column name to "productId"
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'products', // This should be the name of the products table
      key: 'id', // Reference the id column in the products table
    },
  },
});

module.exports = productImages;


