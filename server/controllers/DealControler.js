const FlashDeal = require('../models/FlashDealModel');

async function createFlashDeal(req, res) {
  try {
    const { discountPercentage, startTime, endTime, isLimitedTime } = req.body;
    const newFlashDeal = await FlashDeal.create({
      discountPercentage,
      startTime,
      endTime,
      isLimitedTime,
    });
    res.status(201).json(newFlashDeal);
  } catch (error) {
    console.error("Error creating flash deal:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
  createFlashDeal,
  routes: [
    {
      path: '/api/create/flashdeal',
      method: 'post',
      handler: createFlashDeal,
    }
  ]
};
