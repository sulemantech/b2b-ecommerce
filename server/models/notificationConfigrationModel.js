const { DataTypes } = require('sequelize');
const sequelize = require('../config/config.js');
const notificationTypeModel = require('./notificationTypeModel');

const NotificationConfiguration = sequelize.define('notificationConfiguration', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users', // Assuming 'users' is the name of your user model table
      key: 'id'
    }
  },
  notification_type_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: notificationTypeModel, // Reference the notificationTypeModel directly
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

NotificationConfiguration.belongsTo(notificationTypeModel, { foreignKey: 'notification_type_id' });


// sequelize.sync({ force: true }) // This will drop the existing tables and recreate them
//   .then(() => {
//     console.log('Database synchronized');
//   })
//   .catch(err => {
//     console.error('An error occurred while synchronizing the database:', err);
//   });
module.exports = NotificationConfiguration;
