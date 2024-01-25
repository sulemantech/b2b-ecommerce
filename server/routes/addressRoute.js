const express = require('express');
const router = express.Router();
const addressModel = require('../models/addressModel');
const validateApiKey = require('../middlewares/validateApiKey');
// router.post('/create', ...) - Updated version
router.post('/create',validateApiKey, async (req, res) => {
    try {
      const { address, city, stateId, zipCode, country } = req.body;
  
      const newAddress = await addressModel.create({
        address,
        city,
        stateId,
        zipCode,
        country,
      });

      res.status(201).json(newAddress);
    } catch (error) {
      console.error('Error creating address:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

// Get all addresses
router.get('/getAll',validateApiKey, async (req, res) => {
  try {
    const allAddresses = await addressModel.findAll();
    res.status(200).json(allAddresses);
  } catch (error) {
    console.error('Error getting addresses:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});





module.exports = router;
