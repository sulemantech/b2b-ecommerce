
const sequelize = require('../config/config.js');
const { DataTypes  } = require('sequelize');
const productImages = require('./productImages');
const categoryModel=require('./categoryModel')
const productCategoriesModel=require('./productCategoriesModel')
const supplierModel=require('./supplierModel');
const productVariantModel = require('./productVariantModel');
const FlashDeal=require('./FlashDealModel.js');


// const productModel = sequelize.define('products', {
//   id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true,
//   },
//   name: {
//     type: DataTypes.STRING,
//     // allowNull: false,
//   },
//   description: {
//     type: DataTypes.TEXT,
//     // allowNull: false,
//   },
//   price: {
//     type: DataTypes.FLOAT,
//     // allowNull: false,
//   },
//   quantity: {
//     type: DataTypes.INTEGER,
//     // allowNull: true,
//   },
//   manufacturer: {
//     type: DataTypes.STRING,
//     // allowNull: false,
//   },
//   dateAdded: {
//     type: DataTypes.DATE,
//     // allowNull: false,
//     defaultValue: DataTypes.NOW,
//   },
//   discount: {
//     type: DataTypes.INTEGER,
//     // allowNull: false,
//   },
//   new: {
//     type: DataTypes.BOOLEAN,
//     // allowNull: false,
//   },
//   rating: {
//     type: DataTypes.INTEGER,
//     // allowNull: false,
//   },
//   saleCount: {
//     type: DataTypes.INTEGER,
//     // allowNull: false,
//   },
 
//   tag: {
//     type: DataTypes.ARRAY(DataTypes.STRING),
//     // allowNull: false,
//   },
//   stock: {
//     type: DataTypes.INTEGER,
//     // allowNull: false,
//   },
//   quantityInStock: {
//     type: DataTypes.INTEGER,
//     // allowNull: false,
//   },
//   sku: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     // unique: true,
//   },
//   category_id: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//     // unique: true,
//   },
//   supplier_id: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//   },
//   categoryName: {
//     type: DataTypes.STRING,
//     // allowNull: false,
//   },
//   status: {
//     type: DataTypes.STRING,
//     allowNull: true, 
//     // defaultValue: 'active', 
//   }
// });


// Define association
const productModel = sequelize.define('products', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
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
    allowNull: true,
  },
  manufacturer: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dateAdded: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  discount: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0, // Set a default value if applicable
  },
  isNew: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true, // Set a default value if applicable
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: true, // Adjust as per your requirement
  },
  saleCount: {
    type: DataTypes.INTEGER,
    allowNull: true, // Adjust as per your requirement
  },
  tag: {
    type: DataTypes.STRING, // Use STRING for compatibility
    allowNull: true, // Adjust as per your requirement
    get() {
      const tags = this.getDataValue('tag');
      return tags ? tags.split(',') : [];
    },
    set(value) {
      this.setDataValue('tag', value.join(','));
    },
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0, // Set a default value if applicable
  },
  quantityInStock: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0, // Set a default value if applicable
  },
  sku: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Ensure uniqueness
  },
  categoryName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('active', 'inactive'), // Use ENUM for limited options
    allowNull: false,
    defaultValue: 'active', // Set a default value if applicable
  },
  category_id: {
    type: DataTypes.INTEGER,
    allowNull: true   
  },
  
    SalePrice:{
      type:DataTypes.INTEGER,
      allowNull:true
    },

  
  DealId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: FlashDeal,
      key: 'DealId',
    }
  },
  DealStatus:{
    type:DataTypes.BOOLEAN,
    allowNull:false
  },
  SaleStatus:{
    type:DataTypes.BOOLEAN,
    allowNull:false
  },
  Approved:{
    type:DataTypes.BOOLEAN,
    allowNull:false
  }
});

productModel.hasMany(productImages, { foreignKey: 'productId' });
productModel.belongsTo(supplierModel, { foreignKey: 'supplier_id' });
productModel.belongsTo(categoryModel, { foreignKey: 'category_id' });
productModel.belongsTo(FlashDeal,{foreignKey:'DealId'});
// productModel.belongsToMany(categoryModel, { through: productCategoriesModel });
categoryModel.belongsToMany(productModel, { through: productCategoriesModel }); 
productModel.hasMany(productVariantModel, { foreignKey: 'productId' });

module.exports = productModel;



