const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const notificationModel = require('../models/notificationModel');
const notificationTypeModel = require('../models/notificationTypeModel');
const notificationConfigrationModel = require('../models/notificationConfigrationModel');

router.post('/', (req, res) => {
    const { token, title, body } = req.body;
  
    const message = {
      notification: {
        title: title,
        body: body,
      },
      token: token,
    };
    admin.messaging().send(message)
      .then(resp => {
        res.send('Notification sent');
      })
      .catch(error => {
        console.error('Error sending notification:', error);
        res.status(500).send('Error sending notification');
      });
  });

  //notification
router.post('/send', async (req, res) => {
  try {
    const { notification_type_id, related_entity_type, related_entity_id, message, sender_id, recipient_id, status } = req.body;

    // Create the notification
    const newNotification = await notificationModel.create({
      notification_type_id,
      related_entity_type,
      related_entity_id,
      message,
      sender_id,
      recipient_id,
      status
    });

    res.status(201).json(newNotification);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
  

//notificationType
router.post('/types', async (req, res) => {
  try {
    // Extract data from request body
    const { typeName, description } = req.body;

    // Create a new notificationType
    const newNotificationType = await notificationTypeModel.create({
      typeName,
      description
    });

    // Send a success response with the created notificationType
    res.status(201).json(newNotificationType);
  } catch (error) {
    // If an error occurs, send an error response
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

//new notificationConfiguration
router.post('/config', async (req, res) => {
  try {
    // Extract data from request body
    const { user_id, notification_type_id, is_enabled } = req.body;

    // Create a new notificationConfiguration
    const newNotificationConfiguration = await notificationConfigrationModel.create({
      user_id,
      notification_type_id,
      is_enabled
    });

    // Send a success response with the created notificationConfiguration
    res.status(201).json(newNotificationConfiguration);
  } catch (error) {
    // If an error occurs, send an error response
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


  module.exports=router;








