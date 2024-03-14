
const { DataTypes } = require('sequelize');
const sequelize = require('../config/config.js');

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
// sequelize.sync({ force: true }) // This will drop the existing tables and recreate them
//   .then(() => {
//     console.log('Database synchronized');
//   })
//   .catch(err => {
//     console.error('An error occurred while synchronizing the database:', err);
//   });
module.exports = notificationTypeModel;
