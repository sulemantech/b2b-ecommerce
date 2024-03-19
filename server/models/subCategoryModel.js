const sequelize = require('../config/config.js');
const { Sequelize } = require('sequelize');
// const categoryModel = require('./categoryModel.js');

const subCategoryModel = sequelize.define('subCategories', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      categoryId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'categories', // name of the parent table
          key: 'id', // name of the primary key in the parent table
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
// sequelize.sync({ force: false }) // This will drop the existing tables and recreate them
//   .then(() => {
//     console.log('Database synchronized');
//   })
//   .catch(err => {
//     console.error('An error occurred while synchronizing the database:', err);
//   });
module.exports = subCategoryModel;
