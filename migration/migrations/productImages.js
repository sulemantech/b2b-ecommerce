'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('notificationConfigurations', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users', 
          key: 'id'
        }
      },
      notification_type_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'notificationTypes', 
          key: 'id'
        }
      },
      is_enabled: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Drop the notificationConfigurations table
    await queryInterface.dropTable('notificationConfigurations');
  }
};
