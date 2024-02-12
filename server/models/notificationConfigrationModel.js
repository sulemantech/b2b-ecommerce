// models/notificationConfiguration.js

const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');
const notificationTypeModel = require('./notificationTypeModel');
const notificationConfigurationModel = sequelize.define('notificationConfiguration', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'User',
      key: 'id'
    }
  },
  notification_type_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'notificationType',
      key: 'id'
    }
  },
  is_enabled: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  }
}, {
  timestamps: false
});

notificationConfigurationModel.belongsTo(notificationTypeModel, { foreignKey: 'notification_type_id' });
module.exports = notificationConfigurationModel;
