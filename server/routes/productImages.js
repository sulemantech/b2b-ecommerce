// const express = require('express');
// const router = express.Router();
// const multer = require('multer');
// const path = require('path');
// const productImages = require('../models/productImages');

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, '../client/public/assets/products/sku_5');
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     cb(null,file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    
//   },
//   // 
// });

// const upload = multer({ 
//   storage: storage,
//   limits: { fileSize: 1000000000 },
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
//     const {productId}= req.body;
//     const images = req.files.map(file => file.path);

//     const newProductImage = await productImages.create({ images,productId });
//     res.status(201).json(newProductImage);
//   } catch (error) {
//     console.error('Error creating product image:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });


// //getimages
// router.get('/', async (req, res) => {
//   try {
//     const productIma = await productImages.findAll();
//     res.json(productIma);
//   } catch (error) {
//     console.error('Error getting product images:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
//  });

// module.exports = router;



// const express = require('express');
// const router = express.Router();
// const multer = require('multer');
// const path = require('path');
// const productImages = require('../models/productImages')
// const upload = multer({ 
//   storage: storage,
//   limits: { fileSize: 1000000000 },
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
//     const { productId } = req.body;
//     const images = req.files.map(file => file.filename); // Use file.filename instead of file.path

//     // Modify the paths to be relative
//     const relativePaths = images.map(filename => path.join('assets', 'products', 'sku_1', filename));
//     // const pathsString = images.map(filename => path.join('assets', 'products', 'sku_1', filename)).join(',');

//     const newProductImage = await productImages.create({ images: relativePaths, productId });
//     res.status(201).json(newProductImage);
//   } catch (error) {
//     console.error('Error creating product image:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });


// // get images
// router.get('/', async (req, res) => {
//   try {
//     const productIma = await productImages.findAll();
//     res.json(productIma);
//   } catch (error) {
//     console.error('Error getting product images:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });


// router.get('/:id', async (req, res) => {
//   try {
//     const productId = req.params.id;
//     const productImage = await productImages.findByPk(productId);

//     if (!productImage) {
//       return res.status(404).json({ error: 'Product image not found' });
//     }

//     res.json(productImage);
//   } catch (error) {
//     console.error('Error getting product image by ID:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });


// module.exports = router;




const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const productImages = require('../models/productImages');
const { Op } = require('sequelize');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/assets/products/sku_1'); 
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const filename = `${Date.now()}${ext}`;
    cb(null, filename);
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
  },
}).array('images', 3);

// POST API
router.post('/', upload, async (req, res) => {
  try {
    const { productId } = req.body;
    const images = req.files.map(file => file.filename);

    // Modify the paths to be relative
    const relativePaths = images.map(filename =>
      path.join('assets', 'products', 'sku_1', filename)
    );

    const newProductImage = await productImages.create({
      images: relativePaths,
      productId,
    });

    res.status(201).json(newProductImage);
  } catch (error) {
    console.error('Error creating product image:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// get images
router.get('/', async (req, res) => {
  try {
    const productIma = await productImages.findAll();
    res.json(productIma);
  } catch (error) {
    console.error('Error getting product images:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const productImage = await productImages.findOne({
      where: {
        productId: {
          [Op.eq]: productId,
        },
      },
    });

    if (!productImage) {
      return res.status(404).json({ error: 'Product image not found' });
    }

    res.json(productImage);
  } catch (error) {
    console.error('Error getting product image by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
