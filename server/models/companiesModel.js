const { DataTypes } = require('sequelize');
const sequelize = require('../config/config.js');
const addressModel = require('./addressModel');

const companiesModel = sequelize.define('companies', {
  
  companyName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  industry: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  addressId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: addressModel,
      key: 'id',
    },
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  contactInformation: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  website: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  industryType: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  shippingInformation: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  paymentMethods: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  returnPolicy: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

companiesModel.belongsTo(addressModel, { foreignKey: 'addressId' });

module.exports = companiesModel;
