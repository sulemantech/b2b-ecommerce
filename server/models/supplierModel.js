
const sequelize = require('../database/db');
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
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
});



module.exports = supplierModel;