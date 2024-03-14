const express = require('express');
const router = express.Router();
const validateApiKey = require('../middlewares/validateApiKey');
const addressController = require('../controllers/addressController');

router.post('/api/address/create', validateApiKey, addressController.createAddress);
router.get('/api/address/getAll', validateApiKey, addressController.getAllAddresses);

module.exports = router;
