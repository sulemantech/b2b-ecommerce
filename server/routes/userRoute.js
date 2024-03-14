const express = require('express');
const router = express.Router();
const authController = require('../controllers/userController');
const verifyToken = require('../middlewares/verifyToken');
const validateRegistration = require('../middlewares/validateResistraion');

router.post('/api/user/login', authController.login);
router.post('/api/user/register/customer', validateRegistration, authController.registerCustomer);
router.post('/api/user/register/vendor', validateRegistration, authController.registerVendor);
router.get('/api/user/getAll', authController.getRegistrations);
router.get('/api/user/profile', verifyToken, authController.getUserProfile);
router.put('/api/user/profile/update', verifyToken, authController.updateUserProfile);

module.exports = router;
