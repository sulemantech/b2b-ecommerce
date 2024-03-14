
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const registerationModel = require('../models/registerationModel');
const businessModel = require('../models/businessModel');
const customerModel = require('../models/customerModel');
const { Op } = require('sequelize');
const verifyToken = require('../middlewares/verifyToken');

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await registerationModel.findOne({ where: { email } });

    if (user && bcrypt.compareSync(password, user.password)) {
      const tokenData = {
        id: user.id,
        firstname: user.firstname,
        email: user.email,
        role: user.role,
        customerId: user.customerId,
        vendorid: user.businessId,
      };
      const token = jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: '24h' });

      res.cookie('token', token, { httpOnly: true });
      res.status(200).send({ auth: true, token, role: user.role });
    } else {
      res.status(401).send({ auth: false, message: 'Incorrect email or password' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

const registerCustomer = async (req, res) => {
  const { firstname, lastname, address, businessName, contactNumber, email, password } = req.body;

  try {
    const customer = await customerModel.create({ name: firstname + ' ' + lastname, address, email, contactNumber });
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = await registerationModel.create({
      firstname,
      lastname,
      address,
      businessName,
      contactNumber,
      email,
      password: passwordHash,
      customerId: customer.id,
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const registerVendor = async (req, res) => {
  const { firstname, lastname, address, businessName, contactNumber, email, password, vendorId } = req.body;

  try {
    const passwordhash = await bcrypt.hash(password, 10);
    const newUser = await registerationModel.create({
      firstname,
      lastname,
      address,
      businessName,
      contactNumber,
      email,
      password: passwordhash,
      vendorId,
    });
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getRegistrations = async (req, res) => {
  try {
    const allusers = await registerationModel.findAll({
      include: [
        { model: businessModel, as: 'business', attributes: ['name', 'address', 'email'] },
        { model: customerModel, as: 'customer', attributes: ['name', 'address', 'email'] },
      ],
    });
    res.status(200).json(allusers);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getUserProfile = async (req, res) => {
  const userId = req.user.id;

  try {
    const user = await registerationModel.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const userData = {
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      address: user.address,
      contactNumber: user.contactNumber,
      businessName: user.businessName,
    };

    res.status(200).json(userData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateUserProfile = async (req, res) => {
  const userId = req.user.id;

  try {
    const user = await registerationModel.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

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
      updatedAt: user.updatedAt,
    };

    res.status(200).json({ message: 'User profile updated successfully', updatedUserData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  login,
  registerCustomer,
  registerVendor,
  getRegistrations,
  getUserProfile,
  updateUserProfile,
 
  post: [
    {
      path: '/api/user/login',
      method: login,
    },
    {
      path: '/api/user/register/customer',
      method: registerCustomer,
    },
    {
      path: '/api/user/register/vendor',
      method: registerVendor,
    },
  ],
  get: [
    {
      path: '/api/user/registrations',
      method: getRegistrations,
    },
    {
      path: '/api/user/profile',
      // method: getUserProfile,
      method: [verifyToken, login],
    },
  ],
  put: [
    {
      path: '/api/user/profile',
      method: updateUserProfile,
    },
  ],
  
  };
  


        /**
          * @swagger
          * /api/user/registrations:
          *  get:
          *   tags:
          *  - userController
          

          */
          
app.get('/api/user/registrations',async (req, res) => {
 // #swagger.tags = ['userController']
  {
  try {
    const allusers = await registerationModel.findAll({
      include: [
        { model: businessModel, as: 'business', attributes: ['name', 'address', 'email'] },
        { model: customerModel, as: 'customer', attributes: ['name', 'address', 'email'] },
      ],
    });
    res.status(200).json(allusers);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
})


        /**
          * @swagger
          * /api/user/profile:
          *  get:
          *   tags:
          *  - userController
          

          */
          
app.get('/api/user/profile',(req, res, next) => {
 // #swagger.tags = ['userController']
  {
  const token = req.headers.authorization;


  
  if (!token) {
    
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }
  
  const tokenValue = token.split(' ')[1];

    jwt.verify(tokenValue, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {        
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
      }  
      req.user = decoded;   
      next();
    });
  },async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await registerationModel.findOne({ where: { email } });

    if (user && bcrypt.compareSync(password, user.password)) {
      const tokenData = {
        id: user.id,
        firstname: user.firstname,
        email: user.email,
        role: user.role,
        customerId: user.customerId,
        vendorid: user.businessId,
      };
      const token = jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: '24h' });

      res.cookie('token', token, { httpOnly: true });
      res.status(200).send({ auth: true, token, role: user.role });
    } else {
      res.status(401).send({ auth: false, message: 'Incorrect email or password' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}
})


        /**
          * @swagger
          * /api/user/login:
          *  post:
          *   tags:
          *  - userController
          

          */
          
app.post('/api/user/login',async (req, res) => {
 // #swagger.tags = ['userController']
  {
  const { email, password } = req.body;

  try {
    const user = await registerationModel.findOne({ where: { email } });

    if (user && bcrypt.compareSync(password, user.password)) {
      const tokenData = {
        id: user.id,
        firstname: user.firstname,
        email: user.email,
        role: user.role,
        customerId: user.customerId,
        vendorid: user.businessId,
      };
      const token = jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: '24h' });

      res.cookie('token', token, { httpOnly: true });
      res.status(200).send({ auth: true, token, role: user.role });
    } else {
      res.status(401).send({ auth: false, message: 'Incorrect email or password' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}
})


        /**
          * @swagger
          * /api/user/register/customer:
          *  post:
          *   tags:
          *  - userController
          

          */
          
app.post('/api/user/register/customer',async (req, res) => {
 // #swagger.tags = ['userController']
  {
  const { firstname, lastname, address, businessName, contactNumber, email, password } = req.body;

  try {
    const customer = await customerModel.create({ name: firstname + ' ' + lastname, address, email, contactNumber });
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = await registerationModel.create({
      firstname,
      lastname,
      address,
      businessName,
      contactNumber,
      email,
      password: passwordHash,
      customerId: customer.id,
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
})


        /**
          * @swagger
          * /api/user/register/vendor:
          *  post:
          *   tags:
          *  - userController
          

          */
          
app.post('/api/user/register/vendor',async (req, res) => {
 // #swagger.tags = ['userController']
  {
  const { firstname, lastname, address, businessName, contactNumber, email, password, vendorId } = req.body;

  try {
    const passwordhash = await bcrypt.hash(password, 10);
    const newUser = await registerationModel.create({
      firstname,
      lastname,
      address,
      businessName,
      contactNumber,
      email,
      password: passwordhash,
      vendorId,
    });
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
})


        /**
          * @swagger
          * /api/user/profile:
          *  put:
          *   tags:
          *  - userController
          

          */
          
app.put('/api/user/profile',async (req, res) => {
 // #swagger.tags = ['userController']
  {
  const userId = req.user.id;

  try {
    const user = await registerationModel.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

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
      updatedAt: user.updatedAt,
    };

    res.status(200).json({ message: 'User profile updated successfully', updatedUserData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
})
