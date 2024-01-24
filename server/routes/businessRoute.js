const express = require('express');
const router = express.Router();
const businessModel = require('../models/businessModel');

// POST request to create a new business
router.post('/', async (req, res) => {
    try {
      console.log('Raw Request Body:', req.body);
  
      const newBusiness = await businessModel.create({
        name: req.body.name,
        address: req.body.address,
        email: req.body.email,
        contactNumber: req.body.contactNumber,
        description: req.body.description,
      });
  
      res.status(201).json(newBusiness);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  
// GET request to retrieve all businesses
router.get('/', async (req, res) => {
  try {
    const businesses = await businessModel.findAll();
    res.status(200).json(businesses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
