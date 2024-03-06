// src/routes/authRoutes.js
const express = require('express');
const admin = require('firebase-admin');
// const serviceAccount = require("../serviceAccount.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   // databaseURL: "https://otp-generator-app-default-rtdb.firebaseio.com"
// });

// const auth = admin.auth();

const router = express.Router();

//firebase
router.post('/', async (req, res) => {
  try {
    const { idtoken } = req.body;

    // Verify the ID token
    const decodedToken = await auth.verifyIdToken(idtoken);

    // You can access user information from the decoded token
    const uid = decodedToken.auth_time;

    res.json({ success: true, uid });
  } catch (error) {
    res.status(500).json({ success: false, error: error.code });
  }
});

module.exports = router;
