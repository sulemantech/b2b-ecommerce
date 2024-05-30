const businessModel = require('../models/businessModel');

const createBusiness = async (req, res) => {
  try {
    console.log('Raw Request Body:', req.body);

    const newBusiness = await businessModel.create({
      name: req.body.name,
      address: req.body.address,
      email: req.body.email,
      contactNumber: req.body.contactNumber,
      description: req.body.description,
    });

    res.status(201).json(newBusiness);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getAllBusinesses = async (req, res) => {
  try {
    const businesses = await businessModel.findAll();
    res.status(200).json(businesses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  createBusiness,
  getAllBusinesses,
  
    post: [
      {
        path: '/api/business/',
        method: createBusiness,
      },
    ],
    get: [
      {
        path: '/api/business/',
        method: getAllBusinesses,
      },
    ],
  
};
