const { DataTypes } = require('sequelize');
const sequelize = require('../config/config.js');

const FlashDeal = sequelize.define('FlashDeal', {
  DealId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  discountPercentage: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  startTime: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  endTime: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  isLimitedTime: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
});




module.exports = FlashDeal;
