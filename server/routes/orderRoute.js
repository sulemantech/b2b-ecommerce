const express = require('express');
const orderModel = require('../models/orderModel');
const registerationModel = require('../models/registerationModel');
const { Op } = require('sequelize');
const verifyToken = require('../middlewares/verifyToken')
const orderItemsModel = require('../models/orderItemsModel');
const router = express.Router();

// Get all orders
router.get('/', async (req, res) => {
  try {
    const orders = await orderModel.findAll({
      include: [
        {
          model: registerationModel,
          attributes: ['id', 'firstname',"lastname","contactNumber","email"],
        },
        {
          model: orderItemsModel,
          attributes: ['orderItemId', 'productId', 'quantity','priceIndividual'],
        },
      ],
      
    });
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error in order get' });
  }
});

// Add a new order
router.post('/', verifyToken, async (req, res) => {
  const {
    //userId,
    address,
    orderDate,
    totalPrice,
    status,
    discount,
    paymentMethod,
    trackingNumber,
  } = req.body;

  const userId = req.user.id.id;

  try {
    const newOrder = await orderModel.create({
      userId,
      address,
      orderDate,
      totalPrice,
      status,
      discount,
      paymentMethod,
      trackingNumber,
    });
    res.json(newOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error in order post' });
  }
});

module.exports = router;
