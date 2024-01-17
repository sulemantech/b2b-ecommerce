const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const productImages = require('../models/productImages');
const { upload } = require('../middlewares/multerMiddleware');


// post images API
router.post('/', upload, async (req, res) => {
  try {
    const { productId, id } = req.body;
    const images = req.files.map(file => '/'+ file.path.replace(/\\/g, '/'));

    const newProductImage = await productImages.create({
      images, // Use the correct variable name here
      productId,
      id,
    });

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

 // Delete image API
router.delete('/:productId', async (req, res) => {
  try {
    const { productId } = req.params;

    // Check if the product image exists
    const existingProductImage = await productImages.findByPk(productId);
    if (!existingProductImage) {
      return res.status(404).json({ error: 'Product image not found' });
    }

    // Delete all product images for the given productId
    await productImages.destroy({
      where: {
        productId: productId
      }
    });

    res.json({ message: 'Product images deleted successfully for the specified productId' });
  } catch (error) {
    console.error('Error deleting product images:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



// Update image API
router.put('/:id', upload, async (req, res) => {
  try {
    const { id } = req.params;
    const { productId } = req.body;
    
    const existingProductImage = await productImages.findByPk(id);

    if (!existingProductImage) {
      return res.status(404).json({ error: 'Product image not found' });
    }
    const updatedImages = req.files.map(file => '/' + file.path.replace(/\\/g, '/'));

    existingProductImage.images = updatedImages;
    existingProductImage.productId = productId;

    await existingProductImage.save();

    res.json(existingProductImage);
  } catch (error) {
    console.error('Error updating product image:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});








module.exports = router;