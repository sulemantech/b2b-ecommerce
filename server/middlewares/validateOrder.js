const validateOrder = (req, res, next) => {
  const { address, totalPrice, status, discount, paymentMethod, trackingNumber,
    name, email, contactNumber, zipCode, city, country, orderItems } = req.body;

  // Validate address
  if (typeof address !== 'string') {
    return res.status(400).json({ error: 'Address must be a string' });
  }

  // Validate totalPrice
  if (typeof totalPrice !== 'number' || totalPrice <= 0) {
    return res.status(400).json({ error: 'Total price must be a positive number' });
  }

  // Validate status
  if (!['Pending', 'Processing', 'Shipped', 'Delivered', 'pending','active','Active','processing', 'shipped','inactive','Inactive'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }

  // Validate discount
  if (typeof discount !== 'number' || discount < 0 || discount > 100) {
    return res.status(400).json({ error: 'Discount must be a number between 0 and 100' });
  }

  // Validate paymentMethod
  if (typeof paymentMethod !== 'string') {
    return res.status(400).json({ error: 'Payment method must be a string' });
  }

  // Validate trackingNumber
  if (trackingNumber && typeof trackingNumber !== 'string') {
    return res.status(400).json({ error: 'Tracking number must be a string' });
  }

  // Validate name
  if (typeof name !== 'string') {
    return res.status(400).json({ error: 'Name must be a string' });
  }

  // Validate email
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

 // Validate contactNumber
if (typeof contactNumber !== 'number' || !Number.isInteger(contactNumber) ) {
  return res.status(400).json({ error: 'Contact number must be an INTEGER.' });
}

  // Validate zipCode
  if (typeof zipCode !== 'number') {
    return res.status(400).json({ error: 'Zip code must be a number' });
  }

  // Validate city
  if (typeof city !== 'string') {
    return res.status(400).json({ error: 'City must be a string value.' });
  }

  // Validate country
  if (typeof country !== 'string') {
    return res.status(400).json({ error: 'Country must be a string' });
  }

  // Validate each order item
  for (const item of orderItems) {
    if (typeof item.productId !== 'number' || typeof item.quantity !== 'number' || typeof item.price !== 'number' ||
        typeof item.discount !== 'number'|| item.discount >= 100 || typeof item.totalPrice !== 'number') {
      return res.status(400).json({ error: 'Invalid order item type' });
    }
  }
  next(); // Call next() to proceed to the next middleware or route handler
};

module.exports = validateOrder;

