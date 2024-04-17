
const sequelize = require('../config/config.js');
const { DataTypes } = require('sequelize');
const categoryModel = sequelize.define('categories', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  parentId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'categories',
      key: 'id',
    },
  },
});

categoryModel.hasMany(categoryModel, { foreignKey: 'parentId', as: 'subcategories' });


// sequelize.sync({ force: false }) // This will drop the existing tables and recreate them
//   .then(() => {
//     console.log('Database synchronized');
//   })
//   .catch(err => {
//     console.error('An error occurred while synchronizing the database:', err);
//   });
module.exports = categoryModel;
