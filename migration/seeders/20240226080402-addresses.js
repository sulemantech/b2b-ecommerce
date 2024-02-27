'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Define the data to be seeded
    const addresses = [
      { address: '123 Main St', city: 'City1', stateId: 1, zipCode: 12345, country: 'Country1' },
      // Add more addresses as needed
    ];

    // Insert the data into the database
    await queryInterface.bulkInsert('addresses', addresses, {});

    console.log('Addresses seeded successfully');
  },

  async down(queryInterface, Sequelize) {
    // Rollback seeding (if necessary)
    await queryInterface.bulkDelete('addresses', null, {});
  }
};
