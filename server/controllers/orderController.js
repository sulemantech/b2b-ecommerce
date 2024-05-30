const orderModel = require('../models/orderModel');
const orderItemsModel = require('../models/orderItemsModel');
const productModel = require('../models/productModel');
const validateOrder = require('../middlewares/validateOrder');

const getAllOrders = async (req, res) => {
  try {
    const orders = await orderModel.findAll({
      include: [
        {
          model: orderItemsModel,
          attributes: ["orderId", "price", "discount", "totalPrice", 'productId', 'quantity'],
        },
      ],
    });
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error in order get' });
  }
};

const getUserOrders = async (req, res) => {
  const userId = req.user.id;

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
};

const getOrdersByRole = async (req, res) => {
  try {
    const userRole = req.user.role;

    if (userRole === 'admin') {
      const orders = await orderModel.findAll({
        include: [
          {
            model: orderItemsModel,
            attributes: ["orderId", "price", "discount", "totalPrice", 'productId', 'quantity'],
          },
        ],
        order: [['orderId', 'ASC']],
      });
      res.json(orders);
    } else if (userRole === 'user' || userRole==='supplier') {
      const userId = req.user.vendorid;
      const supplierOrders = await orderModel.findAll({
        where: { '$orderItems.vendorId$': userId },
        include: [
          {
            model: orderItemsModel,
            attributes: ["orderId", "price", "discount", "totalPrice", 'productId', 'quantity','vendorId'],
          },
        ],
        order: [['orderId', 'ASC']],
      });
      res.json(supplierOrders);
    } else {
      res.status(403).json({ message: 'Unauthorized: Access denied' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error in order get' });
  }
};

const createOrder = async (req, res) => {
  const { address, totalPrice, discount, paymentMethod, trackingNumber, name, email, contactNumber, zipCode, additionalInfo, city, country, shippingAddress, orderItems } = req.body;
  const userId = req.user.id;
  const orderDate = req.user.id.createdAt;
  try {
    const order = await orderModel.create({
      userId, address, orderDate, totalPrice, discount, paymentMethod,
      trackingNumber, name, email, contactNumber, zipCode, additionalInfo, city, country, shippingAddress
    });

    for (const cartItem of orderItems) {
      const product = await productModel.findByPk(cartItem.productId);
      if (!product) {
        return res.status(404).json({ message: `Product with ID ${cartItem.productId} not found` });
      }
      const vendorId = product.supplier_id;

      await orderItemsModel.create({
        orderId: order.orderId,
        productId: cartItem.productId,
        vendorId: vendorId,
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
};

const updateOrder = async (req, res) => {
  const userId = req.user.id;
  const { address, totalPrice, status, discount, paymentMethod, trackingNumber, name, email, contactNumber, zipCode, additionalInfo, city, country, shippingAddress } = req.body;
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
};

const deleteOrder = async (req, res) => {
  const userId = req.user.id;
  const orderIdToDelete = req.params.orderId;

  try {
    const orderToDelete = await orderModel.findOne({
      where: { orderId: orderIdToDelete, userId: userId }
    });

    if (!orderToDelete) {
      return res.status(403).json({ message: 'Unauthorized: Order does not belong to the authenticated user' });
    }

    await orderItemsModel.destroy({ where: { orderId: orderIdToDelete } });

    const deletedOrder = await orderModel.destroy({ where: { orderId: orderIdToDelete } });

    res.json({ message: 'Order deleted successfully', deletedOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error in order deletion' });
  }
};

module.exports = {
  getAllOrders,
  getUserOrders,
  getOrdersByRole,
  createOrder,
  updateOrder,
  deleteOrder,
  
    get: [
      {
        path: '/api/order/',
        method: getAllOrders,
      },
      {
        path: '/api/order/user',
        method: getUserOrders,
      },
      {
        path: '/api/order/role',
        method: getOrdersByRole,
      },
    ],
    post: [
      {
        path: '/api/order/create',
        method: createOrder,
      },
    ],
    put: [
      {
        path: '/api/order/update',
        method: updateOrder,
      },
    ],
    delete: [
      {
        path: '/api/order/delete/:orderId',
        method: deleteOrder,
      },
    ],
  
};