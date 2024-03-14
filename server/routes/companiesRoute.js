const express = require('express');
const router = express.Router();
const companiesController = require('../controllers/companiesController');

router.get('/api/company/get', companiesController.getCompanies);
router.post('/api/company/', companiesController.addCompany);

module.exports = router
