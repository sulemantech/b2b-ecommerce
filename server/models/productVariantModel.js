const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');

const productVariantModel = sequelize.define('productVariants', {
  type: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  weight: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  unit: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  key: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  value: {
    type: DataTypes.JSONB,
    allowNull: true,
  },
  availableQuantity: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  variantPrice: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  optionValues: {
    type: DataTypes.JSONB, 
    allowNull: true,
  },
}, {
  timestamps: false, 
});


module.exports = productVariantModel;
