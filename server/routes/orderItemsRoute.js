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
  try {
    // Extract order item details from the request body
    const { orderId, productId, quantity, price, discount, totalPrice } = req.body;

    // Create the order item using Sequelize model
    const orderItem = await orderItemsModel.create({
      
      orderId,
      productId,
      quantity,
      price,
      discount,
      totalPrice,
    });

    // Respond with the created order item
    res.status(201).json({ message: 'Order item created successfully', orderItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
