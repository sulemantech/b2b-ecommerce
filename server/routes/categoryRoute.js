// routes/categoryRoutes.js
const express = require('express');
const categoryModel = require('../models/categoryModel');
const productModel = require('../models/productModel');
const productCategoriesModel = require('../models/productCategoriesModel'); 

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

// Update category by ID
router.put('/:categoryId', async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const { name } = req.body;

    const category = await categoryModel.findByPk(categoryId);

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // Update category name
    category.name = name;
    await category.save();

    res.status(200).json(category);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete category by ID
router.delete('/:categoryId', async (req, res) => {
  try {
    const categoryId = req.params.categoryId;

    const category = await categoryModel.findByPk(categoryId);

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
      // Save details before deletion
      const deletedCategoryDetails = {
        id: category.id,
        name: category.name,
      };

      // Delete the category
      await category.destroy();

      res.status(200).json({
        message: 'Category deleted successfully',
        deletedCategory: deletedCategoryDetails,
      });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = router;
