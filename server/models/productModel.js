
const sequelize = require('../database/db')
const { DataTypes  } = require('sequelize');
const productImages = require('./productImages');
const categoryModel=require('./categoryModel')
const productCategoriesModel=require('./productCategoriesModel')



const productModel = sequelize.define('products', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    // allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    // allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    // allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    // allowNull: true,
  },
  manufacturer: {
    type: DataTypes.STRING,
    // allowNull: false,
  },
  dateAdded: {
    type: DataTypes.DATE,
    // allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  discount: {
    type: DataTypes.INTEGER,
    // allowNull: false,
  },
  new: {
    type: DataTypes.BOOLEAN,
    // allowNull: false,
  },
  rating: {
    type: DataTypes.INTEGER,
    // allowNull: false,
  },
  saleCount: {
    type: DataTypes.INTEGER,
    // allowNull: false,
  },
 
  tag: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    // allowNull: false,
  },
  stock: {
    type: DataTypes.INTEGER,
    // allowNull: false,
  },
  quantityInStock: {
    type: DataTypes.INTEGER,
    // allowNull: false,
  },
  sku: {
    type: DataTypes.STRING,
    allowNull: false,
    // unique: true,
  },
  category_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    // unique: true,
  },
 
});


// Define association
productModel.hasMany(productImages, { foreignKey: 'productId' });
productModel.belongsToMany(categoryModel, { through: productCategoriesModel });
categoryModel.belongsToMany(productModel, { through: productCategoriesModel }); 

sequelize.sync()
  .then(() => {
    console.log('Product model synced with database');
  })
  .catch((error) => {
    console.error('Error syncing product model:', error);
  });

 

module.exports = productModel;



