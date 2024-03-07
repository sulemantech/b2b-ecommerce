require('dotenv').config();
const Sequelize = require('sequelize');
// const sequelize = new Sequelize(process.env.DATABASE, process.env.USER_NAME, process.env.PASSWORD, {
//   host: process.env.HOST,
//   dialect: process.env.DIALECT
// });

const sequelize = new Sequelize('b2becommerce3', 'root', '', {
  host: 'localhost',
  dialect: 'mariadb'
});

module.exports = sequelize;
