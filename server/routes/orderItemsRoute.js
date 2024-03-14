const express = require('express');
const router = express.Router();
const orderItemsController = require('../controllers/orderItemsController');

router.get('/api/orderitems/', orderItemsController.getAllOrderItems);

module.exports = router

