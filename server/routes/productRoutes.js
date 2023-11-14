
const express = require('express');
const router = express.Router();
const multer = require('multer');
const {Op}= require('sequelize')
const path = require('path');
const productModel = require('../models/productModel');
const productImages= require('../models/productImages')


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});


const upload = multer({ 
  storage: storage,
  limits:{fileSize: '1000000'} ,
  // fileFilter: fileFilter 
  fileFilter: (req,file,cb)=>{
    const fileTypes = /jpeg|jpg|png|gif/
    const mimeType =fileTypes.test(file.mimetype)
    const extname = fileTypes.test(path.extname(file.originalname))

    if (mimeType && extname) {
      return cb(null, true)
    } cb('give proper file')
  }
}).single('image')


// POST API
router.post('/', upload, async (req, res) => {
  try {
    const image = req.file.path;
    
    const { name,description,price,quantity, manufacturer,dateAdded,quantityInStock,sku,discount, new: isNew, rating, saleCount, category, tag, stock, } = req.body;
    const newData = await productModel.create({ 
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
      category: category.split(',').map((item) => item.trim()),
      tag: tag.split(',').map((item) => item.trim()),
      stock,
      image, 
    });
    res.status(200).json(newData)

    // res.status(201).json(newData);
    
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET API
router.get('/products', async (req, res) => {
  try {
    const allProducts = await productModel.findAll();
    console.log(allProducts);
    res.status(200).json(allProducts);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//get api for getting images from productimages table for the specific id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const product = await productModel.findOne({
      where: { id },
      include: {
        model: productImages,
        where: { productId: id }, 
        attributes: ['date', 'images'], // Specify the columns 
      },
    });

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});




module.exports = router;
