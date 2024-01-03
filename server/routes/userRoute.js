
// module.exports = router;
const jwt = require('jsonwebtoken');
const { Sequelize } = require('sequelize');
const registerationModel = require('../models/registerationModel');
const router = require('./productRoutes');
const bcrypt = require('bcrypt');
const verifyToken = require('../middlewares/verifyToken');

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

//get specific user data that is login
router.get('/user/profile', verifyToken, async (req, res) => {
  const userId = req.user.id.id; // Assuming the decoded token has an 'id' property

  try {
    const user = await registerationModel.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // You can customize the user data you want to send in the response
    const userData = {
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      address: user.address,
      contactNumber: user.contactNumber,
      businessName: user.businessName
      // Add other fields as needed
    };

    res.status(200).json(userData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error in user profile route' });
  }
});

// Update user profile
router.put('/user/profile/update', verifyToken, async (req, res) => {
const userId = req.user.id.id; 

try {
  const user = await registerationModel.findByPk(userId);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  // Update user information 
    user.firstname = req.body.firstname || user.firstname;
    user.lastname = req.body.lastname || user.lastname;
    user.email = req.body.email || user.email;
    user.address = req.body.address || user.address;
    user.contactNumber = req.body.contactNumber || user.contactNumber;
    user.businessName = req.body.businessName || user.businessName;
    user.createdAt = new Date(); 
    user.updatedAt = new Date();

  await user.save();

  const updatedUserData = {
    id: user.id,
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    address: user.address,
    contactNumber: user.contactNumber,
    businessName: user.businessName,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt

  };

  res.status(200).json({ message: 'User profile updated successfully', updatedUserData });
} catch (error) {
  console.error(error);
  res.status(500).json({ error: 'Internal Server Error in user profile update route' });
}
});



module.exports = router;