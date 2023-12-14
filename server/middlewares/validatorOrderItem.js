const validator = require('validator');

function validateOrderItem(item) {
  if (!validator.isInt(item.productId.toString())) {
    throw new Error('Invalid productId for order item');
  }

  if (!validator.isInt(item.quantity.toString()) || item.quantity <= 0) {
    throw new Error('Invalid quantity for order item');
  }

  if (!validator.isNumeric(item.discount.toString()) || item.discount < 0 || item.discount > 100) {
    throw new Error('Invalid discount for order item. It must be a numeric value between 0 and 100.');
  }
  return true;
}

module.exports = validateOrderItem;
