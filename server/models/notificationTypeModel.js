
const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');

const notificationTypeModel = sequelize.define('notificationType', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  typeName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING
  }
}, {
  timestamps: false
});


//title

module.exports = notificationTypeModel;
