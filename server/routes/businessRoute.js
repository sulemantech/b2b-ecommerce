const express = require('express');
const router = express.Router();
const businessController = require('../controllers/businessController');

router.post('/api/business/', businessController.createBusiness);
router.get('/api/business/', businessController.getAllBusinesses);

module.exports = router
