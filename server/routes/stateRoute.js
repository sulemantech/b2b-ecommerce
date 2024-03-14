const express = require('express');
const router = express.Router();
const stateController = require('../controllers/stateController');

// Get all states
router.get('/api/state/get', stateController.getAllStates);

// Add a new state
router.post('/api/state/post', stateController.addState);

module.exports = router;
