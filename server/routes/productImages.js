const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const productImages = require('../models/productImages');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '../client/public/assets/products/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 100000000 },
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const mimeType = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname));

    if (mimeType && extname) {
      return cb(null, true);
    }
    cb('Give proper file');
  }
}).array('images', 3); 

// POST API
router.post('/', upload, async (req, res) => {
  try {
    const {productId,id}= req.body;
    const images = req.files.map(file => file.path);

    const newProductImage = await productImages.create({ images,productId,id });
    res.status(201).json(newProductImage);
  } catch (error) {
    console.error('Error creating product image:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


//getimages
router.get('/get', async (req, res) => {
  try {
    const productIma = await productImages.findAll();
    res.json(productIma);
  } catch (error) {
    console.error('Error getting product images:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
 });

module.exports = router;