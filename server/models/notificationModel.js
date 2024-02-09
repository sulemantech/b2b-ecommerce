
const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');
const notificationTypeModel = require('./notificationTypeModel');
const notificationModel = sequelize.define('notification', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  notification_type_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'notificationType',
      key: 'id'
    }
  },
  related_entity_type: {
    type: DataTypes.STRING,
    allowNull: false
  },
  related_entity_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  message: {
    type: DataTypes.STRING,
    allowNull: false
  },
  timestamp: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  is_read: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  sender_id: {
    type: DataTypes.INTEGER
  },
  recipient_id: {
    type: DataTypes.INTEGER
  },
  status: {
    type: DataTypes.STRING
  }
}, {
  timestamps: false
});


notificationModel.belongsTo(notificationTypeModel, { foreignKey: 'notification_type_id' });
module.exports = notificationModel;
