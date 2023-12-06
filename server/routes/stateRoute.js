const express = require('express');
const stateModel = require('../models/stateModel');
const citiesModel = require('../models/citiesModel');
const {Op}= require('sequelize')

const router = express.Router();

// Get all states
router.get('/get', async (req, res) => {
  try {
    const states = await stateModel.findAll({
      include: {
        model: citiesModel,
        where: { stateId:{[Op.col]:'cities.stateId'}   }, 
       
      },
    });
    res.json(states);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Add a new state
router.post('/post', async (req, res) => {
  const { stateName, stateCode, stateId } = req.body;

  try {
    const newState = await stateModel.create({ stateName, stateCode,stateId });
    res.json(newState);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error in state post' });
  }
});



module.exports = router;
