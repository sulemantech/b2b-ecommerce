const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');

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
  

  module.exports=router;