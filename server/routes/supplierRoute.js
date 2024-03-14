const express = require('express');
const router = express.Router();
const supplierController = require('../controllers/supplierController');

// Get all suppliers
router.get('/api/suppliers/all', supplierController.getAllSuppliers);

// Get a specific supplier by ID
router.get('/api/suppliers/:id', supplierController.getSupplierById);

// Create a new supplier
router.post('/api/suppliers/', supplierController.createSupplier);

module.exports = router;
