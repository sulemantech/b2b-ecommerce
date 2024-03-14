const express = require('express');
const router = express.Router();
const citiesController = require('../controllers/citiesController');

router.get('/api/cities/get', citiesController.getCities);
router.post('/api/cities/post', citiesController.postCity);

module.exports = router

