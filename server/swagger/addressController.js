
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
  


        /**
          * @swagger
          * /api/address/all:
          *  get:
          *   tags:
          *  - addressController
          

          */
          
app.get('/api/address/all',async (req, res) => {
 // #swagger.tags = ['addressController']
  {
  try {
    const allAddresses = await addressModel.findAll();
    res.status(200).json(allAddresses);
  } catch (error) {
    console.error('Error getting addresses:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
})


        /**
          * @swagger
          * /api/address/create:
          *  post:
          *   tags:
          *  - addressController
          

          */
          
app.post('/api/address/create',async (req, res) => {
 // #swagger.tags = ['addressController']
  {
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
})
