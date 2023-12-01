// routes/supplierRoutes.js
const express = require('express');
const router = express.Router();
const supplierModel = require('../models/supplierModel');

// Get all suppliers
router.get('/all', async (req, res) => {
  try {
    const suppliers = await supplierModel.findAll();
    res.json(suppliers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get a specific supplier by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const supplier = await supplierModel.findByPk(id);
    if (!supplier) {
      return res.status(404).json({ error: 'Supplier not found' });
    }
    res.json(supplier);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Create a new supplier
router.post('/', async (req, res) => {
  const { supplier_name, contact_info, contact_person, website, description } = req.body;
  try {
    const newSupplier = await supplierModel.create({
      supplier_name,
      contact_info,
      contact_person,
      website,
      description,
    });
    res.status(201).json(newSupplier);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



module.exports = router;
