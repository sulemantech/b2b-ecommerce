const express = require('express');
const companiesModel = require('../models/companiesModel');
const addressModel = require('../models/addressModel');
const router = express.Router();

// Get all companies
router.get('/get', async (req, res) => {
  try {
    const companies = await companiesModel.findAll({
      include: {
        model: addressModel,
      },
    });
    res.json(companies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Add a new company
router.post('/', async (req, res) => {
  const {
    companyName,
    industry,
    addressId,
    description,
    contactInformation,
    website,
    industryType,
    shippingInformation,
    paymentMethods,
    returnPolicy,
    status,
  } = req.body;

  try {
    const newCompany = await companiesModel.create({
      companyName,
      industry,
      addressId,
      description,
      contactInformation,
      website,
      industryType,
      shippingInformation,
      paymentMethods,
      returnPolicy,
      status,
    });

    res.json(newCompany);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error in company post' });
  }
});

module.exports = router;
