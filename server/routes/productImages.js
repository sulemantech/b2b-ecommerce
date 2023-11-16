const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const productImages = require('../models/productImages');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/assets/productImages/SKU_1');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 1000000000 },
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const mimeType = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname));

    if (mimeType && extname) {
      return cb(null, true);
    }
    cb('Give proper file');
  }
}).array('images', 3); // 'images' should match the field name used in your form or request

// POST API
router.post('/', upload, async (req, res) => {
  try {
    const {productId}= req.body;
    const images = req.files.map(file => file.path);

    const newProductImage = await productImages.create({ images,productId });
    res.status(201).json(newProductImage);
  } catch (error) {
    console.error('Error creating product image:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


//getimages
router.get('/', async (req, res) => {
  try {
    const productIma = await productImages.findAll();
    res.json(productIma);
  } catch (error) {
    console.error('Error getting product images:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
 });

module.exports = router;















// const express = require('express');
// const router = express.Router();
// const multer = require('multer');
// const path = require('path');
// const productImages= require('../models/productImages')

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'imagess');
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
//   },
// });

// const upload = multer({ 
//   storage: storage,
//   limits: { fileSize: '1000000000' },
//   fileFilter: (req, file, cb) => {
//     const fileTypes = /jpeg|jpg|png|gif/;
//     const mimeType = fileTypes.test(file.mimetype);
//     const extname = fileTypes.test(path.extname(file.originalname));

//     if (mimeType && extname) {
//       return cb(null, true);
//     }
//     cb('Give proper file');
//   }
// }).array('images', 3); // 'images' should match the field name used in your form or request


// // POST API
// router.post('/', upload, async (req, res) => {
//   try {
//     const { date } = req.body;
//     const images = req.files.map(file => file.path);

//     // Assuming ProductImage.create can handle an array of images
//     const newProductImage = await productImages.create({ date, images });
//     res.status(201).json(newProductImage);
//   } catch (error) {
//     console.error('Error creating product image:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

  



// // Get all product images
// // router.get('/product-images', async (req, res) => {
// //   try {
// //     const productImages = await ProductImage.findAll();
// //     res.json(productImages);
// //   } catch (error) {
// //     console.error('Error getting product images:', error);
// //     res.status(500).json({ error: 'Internal Server Error' });
// //   }
// // });

// // Get a specific product image by ID
// // router.get('/product-images/:id', async (req, res) => {
// //   try {
// //     const productImage = await ProductImage.findByPk(req.params.id);
// //     if (!productImage) {
// //       return res.status(404).json({ error: 'Product image not found' });
// //     }
// //     res.json(productImage);
// //   } catch (error) {
// //     console.error('Error getting product image by ID:', error);
// //     res.status(500).json({ error: 'Internal Server Error' });
// //   }
// // });



// module.exports = router;
