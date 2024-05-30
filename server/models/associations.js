// associations.js
const registrationModel = require('./registerationModel');
const businessModel = require('./businessModel');
const customerModel = require('./customerModel');

// Define associations
registrationModel.belongsTo(customerModel, { foreignKey: 'customerId', as: 'customer' });
registrationModel.belongsTo(businessModel, { foreignKey: 'businessId', as: 'business' });

// Export the associations
module.exports = { registrationModel, businessModel, customerModel };
