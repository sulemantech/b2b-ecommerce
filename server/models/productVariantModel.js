const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');
const productModel = require('./productModel'); // Assuming this is the correct path to your productModel

const productVariantModel = sequelize.define('productVariants', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
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
    type: DataTypes.TEXT,
    allowNull: true,
    get() {
      const value = this.getDataValue('value');
      return value ? JSON.parse(value) : null;
    },
    set(value) {
      this.setDataValue('value', JSON.stringify(value));
    },
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
    references: {
      model: 'products', // Assuming productModel is correctly defined
      key: 'id',
    },
  },
  optionValues: {
    type: DataTypes.TEXT,
    allowNull: true,
    get() {
      const optionValues = this.getDataValue('optionValues');
      return optionValues ? JSON.parse(optionValues) : null;
    },
    set(value) {
      this.setDataValue('optionValues', JSON.stringify(value));
    },
  },
}, {
  timestamps: false,
});

module.exports = productVariantModel;
