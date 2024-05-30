const express = require('express');
const router = express.Router();
const flashDealController = require('../controllers/DealControler');


router.post('/api/create/flashdeal', flashDealController.createFlashDeal);

module.exports = router;
