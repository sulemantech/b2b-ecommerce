const express = require('express')
const router = express.Router();
const Sequelize=require('sequelize')
const multer = require('multer');
const {Op}= require('sequelize')
const path = require('path');
const productModel = require('../models/productModel');
const productImages= require('../models/productImages');
const categoryModel=require('../models/categoryModel');
const productCategoriesModel = require('../models/productCategoriesModel');


// const { log } = require('console');


// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, '../client/public/assets/products');
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + '-' + file.originalname);
//   },
// });


// const upload = multer({ 
//   storage: storage,
//   limits:{fileSize: '1000000'} ,
//   // fileFilter: fileFilter 
//   fileFilter: (req,file,cb)=>{
//     const fileTypes = /jpeg|jpg|png|gif/
//     const mimeType =fileTypes.test(file.mimetype)
//     const extname = fileTypes.test(path.extname(file.originalname))

//     if (mimeType && extname) {
//       return cb(null, true)
//     } cb('give proper file')
//   }
// }).single('image')


// POST API


router.post('/', async(req, res) => {
  try {
    // const image = req.file.path;
    // upload,
    const { id,name,description,price,quantity, manufacturer,dateAdded,quantityInStock,sku,discount, new: isNew, rating, saleCount,  category_id, tag, stock, } = req.body;
    // console.log(req.body);
    debugger
    const newData = await productModel.create({ 
      id,
      name,
      description,
      price,
      quantity,
      manufacturer,
      dateAdded,
      quantityInStock,
      sku,      
      discount,
      new: isNew,
      rating,
      saleCount,
      category_id,
       tag,
      stock, 
    });
    const category = await categoryModel.findByPk(category_id);

    if (category) {
      // Associate the product with the category
      await newData.addCategory(category, { through: { id: category_id } });
      // Assuming that you have an 'id' field in your through model (productCategoriesModel)
      res.status(201).json({ message: 'Product created and associated with category.' });
    } else {
      res.status(404).json({ message: 'Category not found.' });
    }
    res.status(200).json(newData)
    
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET API
router.get('/', async (req, res) => {
  try {
    const allProducts = await productModel.findAll({
      include: {
        model: productImages,
        where: { productId: { [Op.col]: 'products.id' } }, 
        attributes: ['date', 'images'],
      },
    });
    // console.log(allProducts);
    res.status(200).json(allProducts);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//get api for getting images from productimages table for the specific id
// router.get('/:id', async (req, res) => {
//   try {
//     const { id } = req.params;

//     const product = await productModel.findOne({
//       where: { id },
//       include: {
//         model: productImages,
//         where: { productId: id }, 
//         attributes: ['date', 'images'], // Specify the columns 
//       },
//     });

//     if (!product) {
//       return res.status(404).json({ error: 'Product not found' });
//     }

//     res.json(product);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });




module.exports = router;
