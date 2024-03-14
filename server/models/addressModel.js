const { DataTypes } = require('sequelize');
const sequelize = require('../config/config.js');
const stateModel = require('./stateModel');

const Address = sequelize.define('address', {
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  stateId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: stateModel,
      key: 'stateId',
    },
  },
  zipCode: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  country: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Sync models with the database
// sequelize.sync({ force: true })
//   .then(() => {
//     console.log('Database synchronized successfully');
//   })
//   .catch(error => {
//     console.error('Error synchronizing database:', error);
//   });
module.exports = Address;
