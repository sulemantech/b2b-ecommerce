const companiesModel = require('../models/companiesModel');
const addressModel = require('../models/addressModel');

const getCompanies = async (req, res) => {
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
};

const addCompany = async (req, res) => {
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
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  getCompanies,
  addCompany,
  
    get: [
      {
        path: '/api/company/',
        method: getCompanies,
      },
    ],
    post: [
      {
        path: '/api/company/add',
        method: addCompany,
      },
    ],
  
};