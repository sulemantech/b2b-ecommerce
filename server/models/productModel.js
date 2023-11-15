
const sequelize = require('../database/db')
const { DataTypes  } = require('sequelize');
const productImages = require('./productImages');

const productModel = sequelize.define('products', {
  name: {
    type: DataTypes.STRING,
    //allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    //allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    //allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    //allowNull: true,
  },
  manufacturer: {
    type: DataTypes.STRING,
    //allowNull: false,
  },
  dateAdded: {
    type: DataTypes.DATE,
    //allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  discount: {
    type: DataTypes.INTEGER,
    //allowNull: false,
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
    //allowNull: false,
  },
  category: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
  },
  tag: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    //allowNull: false,
  },
  stock: {
    type: DataTypes.INTEGER,
    //allowNull: false,
  },
  quantityInStock: {
    type: DataTypes.INTEGER,
    //allowNull: false,
  },
  sku: {
    type: DataTypes.STRING,
    //allowNull: false,
    unique: true,
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



// INSERT INTO public.products (
//   id, name, description, price, quantity, manufacturer, "dateAdded", discount, new, rating, "saleCount", category, tag, stock, "quantityInStock", sku, "createdAt", "updatedAt"
// )
// VALUES (
//  5, 'Nike Air Zoom Pegasus', 'Lightweight running shoes for optimal comfort', 192, 50, 'luthfi', '2023-11-22', 10, TRUE, 4, 5, '{"Fashion"}', '{"new feature"}', 99, 99, 'FSH-FTW-ATH-RUN-001', NOW(), NOW()
// );
