const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const verifyToken=require('../middlewares/verifyToken')
// POST endpoint to create a product and its variants
router.post('/api/products/', productController.createProductAndVariants);

// POST endpoint to create bulk products and their variants
router.post('/api/products/bulk', productController.createBulkProducts);

// GET endpoint to retrieve all products for clients
router.get('/api/products/clients/all', productController.getAllProductsForClients);

// GET endpoint to retrieve all products for clients with sorting by price
router.get('/api/products/clients/all/pricesort', productController.getAllProductsForClientsSortPrice);

// GET endpoint to retrieve all products based on user role
router.get('/api/products/all', verifyToken, productController.getAllProductsByUserRole);

// GET endpoint to retrieve products in a specific category by category ID
router.get('/api/products/:category_id', productController.getProductsByCategoryId);

// GET endpoint to retrieve a specific product by ID
router.get('/api/products/specific/:id', productController.getProductById);

// PUT endpoint to update a product and its variants by product ID
router.put('/api/products/:productId', productController.updateProductAndVariants);
router.put('/api/bulk/products/update', productController.updateBulkProducts);


// DELETE endpoint to delete a product and its variants by product ID
router.delete('/api/products/:productId', productController.deleteProductAndVariants);

// DELETE endpoint to delete a specific variant by variant ID
router.delete('/api/products/variants/:variantId', productController.deleteVariant);

module.exports = router;
