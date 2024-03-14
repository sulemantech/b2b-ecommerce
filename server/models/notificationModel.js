const { DataTypes } = require('sequelize');
const sequelize = require('../config/config.js');
const notificationTypeModel = require('./notificationTypeModel');

const Notification = sequelize.define('notification', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  notification_type_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: notificationTypeModel, // Reference the notificationTypeModel directly
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

Notification.belongsTo(notificationTypeModel, { foreignKey: 'notification_type_id' });
// sequelize.sync({ force: true }) // This will drop the existing tables and recreate them
//   .then(() => {
//     console.log('Database synchronized');
//   })
//   .catch(err => {
//     console.error('An error occurred while synchronizing the database:', err);
//   });
module.exports = Notification;
