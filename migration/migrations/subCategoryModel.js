'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('products', 'SaleStatus', {
      type: Sequelize.STRING,
      allowNull: true, // or false if it should not allow null values
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('products', 'SaleStatus');
  },
};
