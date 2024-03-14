const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const verifyToken = require('../middlewares/verifyToken');
const validateOrder = require('../middlewares/validateOrder');

router.get('/api/order/', orderController.getAllOrders);
router.get('/api/order/user', verifyToken, orderController.getUserOrders);
router.get('/api/order/byrole', verifyToken, orderController.getOrdersByRole);
router.post('/api/order/', verifyToken, validateOrder, orderController.createOrder);
router.put('/api/order/update', verifyToken, orderController.updateOrder);
router.delete('/api/order/:orderId', verifyToken, orderController.deleteOrder);

module.exports = router

