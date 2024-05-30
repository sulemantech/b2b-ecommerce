
const sequelize = require('../config/config.js');
const { DataTypes } = require('sequelize');

const supplierModel = sequelize.define('supplier', {
    supplier_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      supplier_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      contact_info: {
        type: DataTypes.STRING,
      },
      contact_person: {
        type: DataTypes.STRING,
      },
      website: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.TEXT,
      }
});

module.exports = supplierModel;