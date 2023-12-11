const express = require('express');
const orderItemsModel = require('../models/orderItemsModel');
const router = express.Router();

// Get all order items
router.get('/', async (req, res) => {
  try {
    const orderItems = await orderItemsModel.findAll();
    res.json(orderItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Add a new order item
router.post('/', async (req, res) => {
  const { orderId, productId, quantity } = req.body;

  try {
    const newOrderItem = await orderItemsModel.create({ orderId, productId, quantity, });
    res.json(newOrderItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error in order item post' });
  }
});

module.exports = router;
