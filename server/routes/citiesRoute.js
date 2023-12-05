const express= require('express');
const citiesModel = require('../models/citiesModel');
const router= express.Router();

router.get('/get', async(req,res)=>{
    try {
        const cities=await citiesModel.findAll();
        res.json(cities)
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
})

router.post('/post', async(req,res)=>{
    const { cityName, stateId } = req.body;

  try {
    const newCity = await citiesModel.create({ cityName, stateId });
    res.json(newCity);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
})


module.exports=router;