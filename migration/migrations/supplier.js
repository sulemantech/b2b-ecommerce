'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('suppliers','vendorName','supplier_name');
    await queryInterface.renameColumn('suppliers','vendorId','supplier_id');
  },

  down: async (queryInterface, Sequelize) => {
    // await queryInterface.renameColumn('suppliers', 'vendorId', 'supplier_id');
  }
};