const sequelize = require('../database/db');
const { DataTypes } = require('sequelize');
const customerModel = require('./customerModel');
const businessModel = require('./businessModel');

const registerationModel = sequelize.define('user', {
      id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
      firstname: {
        type: DataTypes.STRING,
        // allowNull: false,
        unique: true,
      },
      lastname: {
        type: DataTypes.STRING,
        // allowNull: false,
        // unique: true,
      },
      email: {
        type: DataTypes.STRING,
        // allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        // allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
      },
      contactNumber: {
        type: DataTypes.INTEGER,
      },
      businessName: {
        type: DataTypes.STRING,
      },
      role: {
        type: DataTypes.STRING, 
        defaultValue: 'user', 
      },
      customerId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'customer', 
          key: 'id',
        },
        allowNull: true, 
        unique: true, 
      },
      businessId: { // Update the foreign key here
        type: DataTypes.INTEGER,
        references: {
          model: 'business', 
          key: 'id',
        },
        allowNull: true,
        unique: true,
      },
});

// Add the association to define a one-to-one relationship
registerationModel.belongsTo(customerModel, { foreignKey: 'customerId' });
// Update the association to use the new foreign key
registerationModel.belongsTo(businessModel, { foreignKey: 'businessId' });

module.exports =  registerationModel;