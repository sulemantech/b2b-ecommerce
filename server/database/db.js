const Sequelize = require('sequelize');
const sequelize = new Sequelize('Flone', 'postgres', 'hamza', {
  host: 'localhost',
  dialect: 'postgres'
});
module.exports = sequelize;
