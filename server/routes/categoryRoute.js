const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

router.get('/api/categories/all', categoryController.getAllCategories);
router.get('/api/categories/subCategories/all', categoryController.getCategoryWithSubcategories);
router.get('/api/categories/:categoryId', categoryController.getCategoryById);
router.post('/api/categories/', categoryController.createCategory);
router.put('/api/categories/:categoryId', categoryController.updateCategoryById);
router.delete('/api/categories/:categoryId', categoryController.deleteCategoryById);


module.exports = router
