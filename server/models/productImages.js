const sequelize = require('../config/config.js');
const { DataTypes } = require('sequelize');
const productModel = require('./productModel.js');
const productImages = sequelize.define('productImages', {
  
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW, // Modify as per your requirement
  },
  images: {
    type: DataTypes.TEXT, // Change data type to TEXT
    allowNull: false,
    defaultValue: '', // Default value as an empty string
    get() {
      const images = this.getDataValue('images');
      return images ? JSON.parse(images) : [];
    },
    set(value) {
      this.setDataValue('images', JSON.stringify(value));
    },
  },

  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'products',
      key: 'id',
    },
  },
});

module.exports = productImages;


