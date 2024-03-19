const express = require('express');
const router = express.Router();
const subCategoryController = require('../controllers/subCategoryCotroller');

// Route for creating a subcategory
router.post('/api/subcategory/create', subCategoryController.createSubCategory);

// Route for getting all subcategories
router.get('/api/subcategory/all', subCategoryController.getAllSubCategories);

module.exports = router;
