const validator = require('validator');

function validateOrderItem(item, address, totalPrice, status,paymentMethod, trackingNumber,
  name, email, contactNumber, zipCode, additionalInfo, city, country) {
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
  if (!validator.isNumeric(totalPrice.totalPrice.toString()) || item.totalPrice <= 0) {
    throw new Error('Invalid totalPrice for order item. It must be a numeric value greater than 0.totalprice');
  }
  
 // address
if (!validator.isLength(address.address, { min: 5, max: 100 })) {
  throw new Error('Invalid address. It must be between 5 and 100 characters.address');
}
//status
const validStatusValues = ['pending', 'processing', 'completed'];
  if (!validStatusValues.includes(status.status)) {
    throw new Error('Invalid status. It must be one of: pending, processing, completed.status');
  }
  // paymentMethod
  const validPaymentMethods = ['credit_card', 'paypal', 'bank_transfer'];
  if (!validPaymentMethods.includes(paymentMethod.paymentMethod)) {
    throw new Error('Invalid paymentMethod. It must be one of: credit_card, paypal, bank_transfer.payment');
  }
  // trackingNumber
  if (!validator.isLength(trackingNumber.trackingNumber, { min: 1, max: 20 })) {
    throw new Error('Invalid trackingNumber. It must be between 1 and 20 characters.tracking number');
  }
  // name
  if (!validator.isLength(name.name, { min: 2, max: 50 })) {
    throw new Error('Invalid name. It must be between 2 and 50 characters.name');
  }
  // email
  if (!validator.isEmail(email.email)) {
    throw new Error('Invalid email address.email');
  }
  // contactNumber
  if (!validator.isMobilePhone(contactNumber.contactNumber, 'any', { strictMode: false })) {
    throw new Error('Invalid contactNumber. Please provide a valid phone number.contactnumber');
  }
  // zipCode
  if (!validator.isPostalCode(zipCode.zipCode, 'any')) {
    throw new Error('Invalid zipCode. Please provide a valid postal code.zipcode');
  }
  // additionalInfo
  if (!validator.isLength(additionalInfo.additionalInfo, { max: 255 })) {
    throw new Error('Additional info must not exceed 255 characters.additionalinfo');
  }
  // city
  if (!validator.isLength(city.city, { min: 2, max: 50 })) {
    throw new Error('Invalid city. It must be between 2 and 50 characters.city');
  }
  // country
  if (!validator.isLength(country.country, { min: 2, max: 50 })) {
    throw new Error('Invalid country. It must be between 2 and 50 characters.country');
  }
  // orderItems
  if (!order.orderItems || !Array.isArray(order.orderItems) || order.orderItems.length === 0) {
    throw new Error('Invalid orderItems. It must be a non-empty array.orderitems');
  }
  return true;
}

module.exports = validateOrderItem;
