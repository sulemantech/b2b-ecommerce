const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const verifyToken = require('../middlewares/verifyToken');

router.post('/', notificationController.sendNotification);
router.post('/send', notificationController.createNotification);
router.post('/types', notificationController.createNotificationType);
router.post('/config', notificationController.createNotificationConfiguration);
router.get('/specific', verifyToken, notificationController.getSpecificNotifications);
router.put('/update/:id',verifyToken, notificationController.updateNotificationDate);


module.exports = router

