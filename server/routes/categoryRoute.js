// routes/categoryRoutes.js
const express = require('express');
const categoryModel = require('../models/categoryModel'); // Make sure to import your Category model

const router = express.Router();

// Get all categories
router.get('/', async (req, res) => {
  try {
    
    const categories = await categoryModel.findAll();
    res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error retrieving categories' });
  }
});

// Create category
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
