const addressModel = require('../models/addressModel');

const createAddress = async (req, res) => {
  try {
    const { address, city, stateId, zipCode, country } = req.body;

    const newAddress = await addressModel.create({
      address,
      city,
      stateId,
      zipCode,
      country,
    });

    res.status(201).json(newAddress);
  } catch (error) {
    console.error('Error creating address: ', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

const getAllAddresses = async (req, res) => {
  try {
    const allAddresses = await addressModel.findAll();
    res.status(200).json(allAddresses);
  } catch (error) {
    console.error('Error getting addresses:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// module.exports = {
//   createAddress,
//   getAllAddresses,
// };

module.exports = {
    // Define routes for creating an address
    createAddress,
  getAllAddresses,
    post: [
      {
        path: "/api/address/create",
        method: createAddress,
      },
    ],
  
    // Define routes for getting all addresses
    get: [
      {
        path: "/api/address/all",
        method: getAllAddresses,
      },
    ],
  };
  
