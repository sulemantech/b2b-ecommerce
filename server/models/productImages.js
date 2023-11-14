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

sequelize.sync()
  .then(() => {
    console.log('ProductImage model synced with the database');
  })
  .catch((error) => {
    console.error('Error syncing ProductImage model:', error);
  });

module.exports = productImages;


