// routes/categoryRoutes.js
const express = require('express');
const categoryModel = require('../models/categoryModel');
const productModel = require('../models/productModel');
const productCategoriesModel = require('../models/productCategoriesModel'); // Make sure to import your Category model

const router = express.Router();


//get all category list///////////////////////////////////////////////////////
router.get('/all', async (req, res) => {
  try {
    const categoryList = await categoryModel.findAll();
    res.status(200).json(categoryList);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


//get category by ID///////////////////////////////////////////////////////
router.get('/:categoryId', async (req, res) => {
  try {
    const categoryId = req.params.categoryId;

    // Find the category by ID
    const category = await categoryModel.findByPk(categoryId);

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // Retrieve products associated with the category
    const products = await category.getProducts();

    res.status(200).json(products);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Create category///////////////////////////////////////////////////////
router.post('/', async (req, res) => {
  try {
    const {name}=req.body
    const category = await categoryModel.create({name});
    res.status(201).json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating category' });
  }
});

module.exports = router;
