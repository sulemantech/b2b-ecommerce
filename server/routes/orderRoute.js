const express = require('express');
const orderModel = require('../models/orderModel');
const registerationModel = require('../models/registerationModel');
const { Op } = require('sequelize');
const verifyToken = require('../middlewares/verifyToken')
const orderItemsModel = require('../models/orderItemsModel');
const validateOrderItem = require('../middlewares/validatorOrderItem');
const router = express.Router();

// Get all orders 
router.get('/', async (req, res) => {
  try {
    const orders = await orderModel.findAll({
      include: [
       
        {
          model: orderItemsModel,
          attributes: ["orderId", "price", "discount", "totalPrice", 'productId', 'quantity',],
        },
      ],

    });
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error in order get' });
  }
});

//get specific orders of specific users through there id     
router.get('/user', verifyToken, async (req, res) => {
  const userId = req.user.id.id;

  try {
    const userOrders = await orderModel.findAll({
      where: { userId },
      include: [
        {
          model: registerationModel,
          attributes: ['id', 'firstname', 'lastname', 'contactNumber', 'email'],
        },
        {
          model: orderItemsModel,
          attributes: ['orderId', 'price', 'discount', 'totalPrice', 'productId', 'quantity'],
        },
      ],
    });

    res.json(userOrders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error in user orders get' });
  }
});

//POST API FOR ORDER    
router.post('/', verifyToken, async (req, res) => {
  const { address, totalPrice, status, discount, paymentMethod, trackingNumber,
    name, email, contactNumber, zipCode, additionalInfo, city, country, shippingAddress,
    orderItems } = req.body;

  //validator
  try {
    for (const cartItem of orderItems) {
      validateOrderItem(cartItem);
    }
    validateOrderItem(address, totalPrice, status, discount, paymentMethod, trackingNumber,
      name, email, contactNumber, zipCode, additionalInfo, city, country)
  } catch (validationError) {
    return res.status(400).json({ error: validationError.message });
  }
  const userId = req.user.id.id;
  const orderDate = req.user.id.createdAt;
  try {
    // Create a new order
    const order = await orderModel.create({
      userId, address, orderDate, totalPrice, status, discount, paymentMethod,
      trackingNumber, name, email, contactNumber, zipCode, additionalInfo, city, country, shippingAddress
    });

    // Create order items associated with the order
    for (const cartItem of orderItems) {
      await orderItemsModel.create({
        orderId: order.orderId,
        productId: cartItem.productId,
        quantity: cartItem.quantity,
        price: cartItem.price,
        discount: cartItem.discount,
        totalPrice: cartItem.totalPrice,
      });
    }

    res.json({ message: 'Order placed successfully', order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error in order post' });
  }
});

//update api
router.put('/update', verifyToken, async (req, res) => {
  const userId = req.user.id.id;
  const { address, totalPrice, status, discount, paymentMethod, trackingNumber,
    name, email, contactNumber, zipCode, additionalInfo, city, country, shippingAddress,
     } = req.body;
  try {
    const updatedOrder = await orderModel.update(
      {
        address, totalPrice, status, discount, paymentMethod, trackingNumber,
        name, email, contactNumber, zipCode, additionalInfo, city, country, shippingAddress
      },
      {
        where: { userId }
      }
    );

  

    res.json({ message: 'Order updated successfully', updatedOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error in order update' });
  }
});

//delete api

router.delete('/:orderId', verifyToken, async (req, res) => {
  const userId = req.user.id.id; // Assuming this is the user ID of the authenticated user
  const orderIdToDelete = req.params.orderId;

  try {
    // Check if the order belongs to the authenticated user before deleting
    const orderToDelete = await orderModel.findOne({
      where: { orderId: orderIdToDelete, userId: userId }
    });

    if (!orderToDelete) {
      return res.status(403).json({ message: 'Unauthorized: Order does not belong to the authenticated user' });
    }

    // Delete order items associated with the order
    await orderItemsModel.destroy({ where: { orderId: orderIdToDelete } });

    // Delete the order itself
    const deletedOrder = await orderModel.destroy({ where: { orderId: orderIdToDelete } });

    res.json({ message: 'Order deleted successfully', deletedOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error in order deletion' });
  }
});



module.exports = router;
