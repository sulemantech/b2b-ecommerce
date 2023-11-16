
const sequelize = require('../database/db')
const { DataTypes  } = require('sequelize');
const productImages = require('./productImages');

const productModel = sequelize.define('products', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  manufacturer: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dateAdded: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Date.NOW,
  },
  discount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  new: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  saleCount: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },

  tag: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  quantityInStock: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  sku: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
  // image: {
  //   type: DataTypes.STRING // Assuming you store the file path or URL
  // },
});

// Retrieve a product with images
// SELECT * FROM products
// LEFT JOIN productImages ON products.sku = productImages.sku
// WHERE products.sku = 'test_sku';


// Define association
productModel.hasMany(productImages, { foreignKey: 'productId' }); 

sequelize.sync()
  .then(() => {
    console.log('Product model synced with database');
  })
  .catch((error) => {
    console.error('Error syncing product model:', error);
  });

 

module.exports = productModel;
