const sequelize = require('../database/db');
const { DataTypes } = require('sequelize');
const customerModel = require('./customerModel');
const businessModel = require('./businessModel');

const registrationModel = sequelize.define('user', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    firstname: {
        type: DataTypes.STRING,
    },
    lastname: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
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
            model: 'customers',
            key: 'id',
        },
    },
    businessId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'businesses',
            key: 'id',
        },
    }
}, {
    timestamps: false,
});

// Add the association to define a one-to-one relationship
registrationModel.belongsTo(customerModel, { foreignKey: 'customerId', as: 'customer' });
registrationModel.belongsTo(businessModel, { foreignKey: 'businessId', as: 'business' });

module.exports = registrationModel;
