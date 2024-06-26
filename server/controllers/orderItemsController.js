const orderItemsModel = require('../models/orderItemsModel');

const getAllOrderItems = async (req, res) => {
  try {
    const orderItems = await orderItemsModel.findAll();
    res.json(orderItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  getAllOrderItems,
  
    get: [
      {
        path: '/api/orderitems/all',
        method: getAllOrderItems,
      },
    ],
  
};
