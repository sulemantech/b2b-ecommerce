// customerRoute.js
const express = require('express');
const router = express.Router();
const customerModel = require('../models/customerModel');

// POST /api/customers - Create a new customer
router.post('/addCustomer', async (req, res) => {
  const { name, address, email, contactNumber } = req.body;

  try {
    const newCustomer = await customerModel.create({
      name,
      address,
      email,
      contactNumber,
    });

    res.status(201).json(newCustomer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error in creating customer' });
  }
});

// GET /api/customers - Retrieve all customers
router.get('/all', async (req, res) => {
  try {
    const customers = await customerModel.findAll();
    res.status(200).json(customers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error in fetching customers' });
  }
});

module.exports = router;
