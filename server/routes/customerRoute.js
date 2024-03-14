const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

router.post('/api/customer/addCustomer', customerController.addCustomer);
router.get('/api/customer/all', customerController.getAllCustomers);

module.exports = router

