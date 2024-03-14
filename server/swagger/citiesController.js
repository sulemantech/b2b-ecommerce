
const citiesModel = require('../models/citiesModel');

const getCities = async (req, res) => {
  try {
    const cities = await citiesModel.findAll();
    res.json(cities);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const postCity = async (req, res) => {
  const { cityName, stateId } = req.body;

  try {
    const newCity = await citiesModel.create({ cityName, stateId });
    res.json(newCity);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
module.exports = {
  getCities,
  postCity,
  
    get: [
      {
        path: '/api/cities/get',
        method: getCities,
      },
    ],
    post: [
      {
        path: '/api/cities/post',
        method: postCity,
      },
    ],
  
};


        /**
          * @swagger
          * /api/cities/get:
          *  get:
          *   tags:
          *  - citiesController
          

          */
          
app.get('/api/cities/get',async (req, res) => {
 // #swagger.tags = ['citiesController']
  {
  try {
    const cities = await citiesModel.findAll();
    res.json(cities);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
})


        /**
          * @swagger
          * /api/cities/post:
          *  post:
          *   tags:
          *  - citiesController
          

          */
          
app.post('/api/cities/post',async (req, res) => {
 // #swagger.tags = ['citiesController']
  {
  const { cityName, stateId } = req.body;

  try {
    const newCity = await citiesModel.create({ cityName, stateId });
    res.json(newCity);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
})
