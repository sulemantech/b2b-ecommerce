const express = require('express');
const router = express.Router();
const addressModel = require('../models/addressModel');

// router.post('/create', ...) - Updated version
router.post('/create', async (req, res) => {
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
router.get('/getAll', async (req, res) => {
  try {
    const allAddresses = await addressModel.findAll();
    res.status(200).json(allAddresses);
  } catch (error) {
    console.error('Error getting addresses:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get address by ID
// router.get('/:id', async (req, res) => {
//   const addressId = req.params.id;

//   try {
//     const address = await addressModel.findByPk(addressId);

//     if (!address) {
//       return res.status(404).json({ error: 'Address not found' });
//     }

//     res.status(200).json(address);
//   } catch (error) {
//     console.error('Error getting address by ID:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });



module.exports = router;
