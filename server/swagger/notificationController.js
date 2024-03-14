
const admin = require('firebase-admin');
const notificationModel = require('../models/notificationModel');
const notificationTypeModel = require('../models/notificationTypeModel');
const notificationConfigurationModel = require('../models/notificationConfigrationModel');

const sendNotification = async (req, res) => {
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
};

const createNotification = async (req, res) => {
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
};

const createNotificationType = async (req, res) => {
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
};

const createNotificationConfiguration = async (req, res) => {
  try {
    // Extract data from request body
    const { user_id, notification_type_id, is_enabled } = req.body;

    // Create a new notificationConfiguration
    const newNotificationConfiguration = await notificationConfigurationModel.create({
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
};

const getSpecificNotifications = async (req, res) => {
  const userId = req.user.id; 

  try {
    // Fetch notifications for the specific user with their associated type and configuration
    const notifications = await notificationModel.findAll({
      where: { recipient_id: userId }, 
      include: [
        { 
          model: notificationTypeModel,
           attributes: ['id','typeName', 'description']
           }, 
      ]
    });

    res.status(200).json(notifications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  sendNotification,
  createNotification,
  createNotificationType,
  createNotificationConfiguration,
  getSpecificNotifications,
  
    post: [
      {
        path: '/send',
        method: sendNotification,
      },
      {
        path: '/create',
        method: createNotification,
      },
      {
        path: '/types',
        method: createNotificationType,
      },
      {
        path: '/config',
        method: createNotificationConfiguration,
      },
    ],
    get: [
      {
        path: '/specific',
        method: getSpecificNotifications,
      },
    ],
  
};

        /**
          * @swagger
          * /specific:
          *  get:
          *   tags:
          *  - notificationController
          

          */
          
app.get('/specific',async (req, res) => {
 // #swagger.tags = ['notificationController']
  {
  const userId = req.user.id; 

  try {
    // Fetch notifications for the specific user with their associated type and configuration
    const notifications = await notificationModel.findAll({
      where: { recipient_id: userId }, 
      include: [
        { 
          model: notificationTypeModel,
           attributes: ['id','typeName', 'description']
           }, 
      ]
    });

    res.status(200).json(notifications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
})


        /**
          * @swagger
          * /send:
          *  post:
          *   tags:
          *  - notificationController
          

          */
          
app.post('/send',async (req, res) => {
 // #swagger.tags = ['notificationController']
  {
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
}
})


        /**
          * @swagger
          * /create:
          *  post:
          *   tags:
          *  - notificationController
          

          */
          
app.post('/create',async (req, res) => {
 // #swagger.tags = ['notificationController']
  {
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
}
})


        /**
          * @swagger
          * /types:
          *  post:
          *   tags:
          *  - notificationController
          

          */
          
app.post('/types',async (req, res) => {
 // #swagger.tags = ['notificationController']
  {
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
}
})


        /**
          * @swagger
          * /config:
          *  post:
          *   tags:
          *  - notificationController
          

          */
          
app.post('/config',async (req, res) => {
 // #swagger.tags = ['notificationController']
  {
  try {
    // Extract data from request body
    const { user_id, notification_type_id, is_enabled } = req.body;

    // Create a new notificationConfiguration
    const newNotificationConfiguration = await notificationConfigurationModel.create({
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
}
})
