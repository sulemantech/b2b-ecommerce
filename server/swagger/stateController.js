
const stateModel = require('../models/stateModel');
const citiesModel = require('../models/citiesModel');
const { Op } = require('sequelize');

// Controller function to get all states
const getAllStates = async (req, res) => {
  try {
    const states = await stateModel.findAll({
      include: {
        model: citiesModel,
        where: { stateId: { [Op.col]: 'cities.stateId' } },
      },
    });
    res.json(states);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Controller function to add a new state
const addState = async (req, res) => {
  const { stateName, stateCode, stateId } = req.body;

  try {
    const newState = await stateModel.create({ stateName, stateCode, stateId });
    res.json(newState);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error in state post' });
  }
};


module.exports = {
  getAllStates,
  addState,
  get: [
    {
      path: '/api/state/all',
      method: getAllStates,
    },
  ],
  post: [
    {
      path: '/api/state/add',
      method: addState,
    },
  ],
  
};


        /**
          * @swagger
          * /api/state/all:
          *  get:
          *   tags:
          *  - stateController
          

          */
          
app.get('/api/state/all',async (req, res) => {
 // #swagger.tags = ['stateController']
  {
  try {
    const states = await stateModel.findAll({
      include: {
        model: citiesModel,
        where: { stateId: { [Op.col]: 'cities.stateId' } },
      },
    });
    res.json(states);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
})


        /**
          * @swagger
          * /api/state/add:
          *  post:
          *   tags:
          *  - stateController
          

          */
          
app.post('/api/state/add',async (req, res) => {
 // #swagger.tags = ['stateController']
  {
  const { stateName, stateCode, stateId } = req.body;

  try {
    const newState = await stateModel.create({ stateName, stateCode, stateId });
    res.json(newState);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error in state post' });
  }
}
})
