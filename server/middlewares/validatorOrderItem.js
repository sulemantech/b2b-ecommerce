const validator = require('validator');

function validateOrderItem(item) {
  //productId
  if (!validator.isInt(item.productId.toString())) {
    throw new Error('Invalid productId for order item');
  }
  //quantity
  if (!validator.isInt(item.quantity.toString()) || item.quantity <= 0) {
    throw new Error('Invalid quantity for order item');
  }
 //discount
  if (!validator.isNumeric(item.discount.toString()) || item.discount < 0 || item.discount > 75) {
    throw new Error('Invalid discount for order item. It must be a numeric value between 0 and 75.');
  }
  //totalPrice
  if (!validator.isNumeric(item.totalPrice.toString()) || item.totalPrice <= 0) {
    throw new Error('Invalid totalPrice for order item. It must be a numeric value greater than 0.');
  }
// address
if (!validator.isLength(item.address, { min: 5, max: 100 })) {
  throw new Error('Invalid address. It must be between 5 and 100 characters.');
}
//status
const validStatusValues = ['pending', 'processing', 'completed'];
  if (!validStatusValues.includes(item.status)) {
    throw new Error('Invalid status. It must be one of: pending, processing, completed.');
  }
  // paymentMethod
  const validPaymentMethods = ['credit_card', 'paypal', 'bank_transfer'];
  if (!validPaymentMethods.includes(item.paymentMethod)) {
    throw new Error('Invalid paymentMethod. It must be one of: credit_card, paypal, bank_transfer.');
  }
  // trackingNumber
  if (!validator.isLength(item.trackingNumber, { min: 1, max: 20 })) {
    throw new Error('Invalid trackingNumber. It must be between 1 and 20 characters.');
  }
  // name
  if (!validator.isLength(item.name, { min: 2, max: 50 })) {
    throw new Error('Invalid name. It must be between 2 and 50 characters.');
  }
  // email
  if (!validator.isEmail(item.email)) {
    throw new Error('Invalid email address.');
  }
  // contactNumber
  if (!validator.isMobilePhone(item.contactNumber, 'any', { strictMode: false })) {
    throw new Error('Invalid contactNumber. Please provide a valid phone number.');
  }
  // zipCode
  if (!validator.isPostalCode(item.zipCode, 'any')) {
    throw new Error('Invalid zipCode. Please provide a valid postal code.');
  }
  // additionalInfo
  if (!validator.isLength(item.additionalInfo, { max: 255 })) {
    throw new Error('Additional info must not exceed 255 characters.');
  }
  // city
  if (!validator.isLength(item.city, { min: 2, max: 50 })) {
    throw new Error('Invalid city. It must be between 2 and 50 characters.');
  }
  // country
  if (!validator.isLength(item.country, { min: 2, max: 50 })) {
    throw new Error('Invalid country. It must be between 2 and 50 characters.');
  }
  // orderItems
  if (!order.orderItems || !Array.isArray(order.orderItems) || order.orderItems.length === 0) {
    throw new Error('Invalid orderItems. It must be a non-empty array.');
  }
  return true;
}

module.exports = validateOrderItem;
