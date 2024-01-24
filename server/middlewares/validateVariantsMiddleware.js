
const express = require('express');
const validateProduct = (req, res, next) => {
    const { products } = req.body;
  
    if (!products || !products.name || !products.description || !products.price) {
      return res.status(400).json({ message: 'Product details are incomplete.' });
    }
  
    next();
  };
  
  const validateVariants = (req, res, next) => {
    const { variants } = req.body;
  
    if (variants && variants.length > 0) {
      for (const variant of variants) {
        if (!variant.key) {
          return res.status(400).json({ message: 'Variant key is missing.' });
        }
  
        if (!variant.values || variant.values.length === 0) {
          return res.status(400).json({ message: 'Variant values are missing or empty.' });
        }
  
        // Add more conditions for other fields as needed
      }
    }
  
    next();
  };
  
  module.exports = {
    validateProduct,
    validateVariants,
  };
  