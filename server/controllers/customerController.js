const customerModel = require('../models/customerModel');

const addCustomer = async (req, res) => {
  const { name, address, email, contactNumber } = req.body;

  try {
    const newCustomer = await customerModel.create({
      name,
      address,
      email,
      contactNumber,
    });

    res.status(201).json(newCustomer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error in creating customer' });
  }
};

const getAllCustomers = async (req, res) => {
  try {
    const customers = await customerModel.findAll();
    res.status(200).json(customers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error in fetching customers' });
  }
};

module.exports = {
  addCustomer,
  getAllCustomers,
  
    post: [
      {
        path: '/api/customer/',
        method: addCustomer,
      },
    ],
    get: [
      {
        path: '/api/customer/',
        method: getAllCustomers,
      },
    ],
  
};
