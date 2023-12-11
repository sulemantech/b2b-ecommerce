
// module.exports = router;
const jwt = require('jsonwebtoken');
const { Sequelize } = require('sequelize');
const registerationModel = require('../models/registerationModel');
const router = require('./productRoutes');
const bcrypt = require('bcrypt')

router.post('/login', async (req, res) => {
  const { firstname, password } = req.body;

  try {
    const user = await registerationModel.findOne({
      where: {
        firstname,
      },
    });

    if (user) {
      if (bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign({ id: user }, process.env.JWT_SECRET, {
          expiresIn: 86400,
        });

        res.cookie('token', token, { httpOnly: true });
        res.status(200).send({ auth: true, token });
      } else {
        res.status(401).send({ auth: false, message: 'Incorrect password' });
      }
    } else {
      res.status(401).send({ auth: false, message: 'Incorrect firstname' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error in login');
  }
});


router.post('/register', async (req, res) => {
    const { firstname,lastname,address, businessName,contactNumber, email, password } = req.body;
    const passwordhash=await bcrypt.hash(password,10);
    try {
      const newUser = await registerationModel.create({
        firstname,lastname,address, businessName,contactNumber, email, password: passwordhash,
      });
      res.status(201).json(newUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error in register route' });
    }
  });


  // get registration
  router.get('/get/registration', async (req, res) => {
    try {
      const allusers = await registerationModel.findAll();
      res.status(200).json(allusers);
    } catch (error) {
      console.error('Error:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


module.exports = router;