
const express = require('express');

const validateProduct = (req, res, next) => {
  const { products } = req.body;

  if (!products) {
    return res.status(400).json({ message: 'Add product details.' });
  }

  const { name, description, price, quantity, discount, new: isNew, rating, saleCount, tag, stock, quantityInStock, sku, category_id, supplier_id, categoryName, status } = products;

  if (!name || typeof name !== 'string') {
    return res.status(400).json({ message: 'Product name is required and must be a string.' });
  }

  if (!description || typeof description !== 'string') {
    return res.status(400).json({ message: 'Product description is required and must be a string.' });
  }

  if (typeof price !== 'number' || price <= 0) {
    return res.status(400).json({ message: 'Product price is required and must be a positive number.' });
  }

  if (typeof quantity !== 'number' || quantity <= 0) {
    return res.status(400).json({ message: 'Product quantity is required and must be a positive number.' });
  }

  if (typeof discount !== 'number' || discount < 0 || discount >= 100) {
    return res.status(400).json({ message: 'Discount must be a number between 0 and 100.' });
  }

  if (typeof isNew !== 'boolean') {
    return res.status(400).json({ message: 'New status must be a boolean value.' });
  }

  if (typeof rating !== 'number' || rating < 0 || rating > 5) {
    return res.status(400).json({ message: 'Rating must be a number between 0 and 5.' });
  }

  if (!Array.isArray(tag)) {
    return res.status(400).json({ message: 'Tag must be provided as an array.' });
  }

  if (typeof stock !== 'number' || stock < 0) {
    return res.status(400).json({ message: 'Stock must be a positive number or zero.' });
  }

  if (typeof quantityInStock !== 'number' || quantityInStock < 0) {
    return res.status(400).json({ message: 'Quantity in stock must be a positive number or zero.' });
  }

  if (!sku || typeof sku !== 'string') {
    return res.status(400).json({ message: 'SKU is required and must be a string.' });
  }

  if (typeof category_id !== 'number' || category_id <= 0) {
    return res.status(400).json({ message: 'Category ID is required and must be a positive number.' });
  }

  if (typeof supplier_id !== 'number' || supplier_id <= 0) {
    return res.status(400).json({ message: 'Supplier ID is required and must be a positive number.' });
  }

  if (!categoryName || typeof categoryName !== 'string') {
    return res.status(400).json({ message: 'Category name is required and must be a string.' });
  }

  if (status !== 'active' && status !== 'inactive') {
    return res.status(400).json({ message: 'Status must be either "active" or "inactive".' });
  }

  next();
};

  const validateVariants = (req, res, next) => {
    const { variants } = req.body;
  
    if (variants ) {
      for (const variant of variants) {
        console.log("vvv",variant.key);

        if (!variant.key) {
          return res.status(400).json({ message: 'Variant key is missing.' });
        }
  
        if (!variant.values ) {
          return res.status(400).json({ message: 'Variant values are missing or empty.' });
        }
  
        if (!variant.type ) {
          return res.status(400).json({ message: 'Variant type must be either "individual" or "group".' });
        }
  
        if (typeof variant.weight !== 'number' || variant.weight <= 0) {
          return res.status(400).json({ message: 'Variant weight is required and must be a positive number.' });
        }
  
        if (!variant.unit || typeof variant.unit !== 'string') {
          return res.status(400).json({ message: 'Variant unit is required and must be a string.' });
        }
  
        if (typeof variant.availableQuantity !== 'number' || variant.availableQuantity <= 0) {
          return res.status(400).json({ message: 'Variant available quantity is required and must be a non-negative number.' });
        }
        if (variant.optionValues==undefined || variant.optionValues==null || !variant.optionValues) {
          return res.status(400).json({ message: 'Variant optionValues missing.' });
        }
    console.log("variant.optionValues",variant.optionValues);
       
      }
    }
  
    next();
  };

  const validateBulkProducts = (req, res, next) => {
    const products = req.body;
  
    if (!Array.isArray(products)) {
      return res.status(400).json({ error: 'Invalid input. Expected an array of products.' });
    }
  
    for (const product of products) {
      const { name, description, price, quantity, manufacturer, discount, new: isNew, rating, saleCount, tag, stock, quantityInStock, sku, category_id, supplier_id, categoryName, status, variants } = product;
  
      if (!name || typeof name !== 'string') {
        return res.status(400).json({ message: 'Product name is required and must be a string.' });
      }
  
      if (!description || typeof description !== 'string') {
        return res.status(400).json({ message: 'Product description is required and must be a string.' });
      }
  
      if (typeof price !== 'number' || price <= 0) {
        return res.status(400).json({ message: 'Product price is required and must be a positive number.' });
      }
  
      if (typeof quantity !== 'number' || quantity <= 0) {
        return res.status(400).json({ message: 'Product quantity is required and must be a positive number.' });
      }
  
      if (!manufacturer || typeof manufacturer !== 'string') {
        return res.status(400).json({ message: 'Manufacturer is required and must be a string.' });
      }
  
      if (typeof discount !== 'number' || discount < 0 || discount >= 100) {
        return res.status(400).json({ message: 'Discount must be a number between 0 and 100.' });
      }
  
      if (typeof isNew !== 'boolean') {
        return res.status(400).json({ message: 'New status must be a boolean value.' });
      }
  
      if (typeof rating !== 'number' || rating < 0 || rating > 5) {
        return res.status(400).json({ message: 'Rating must be a number between 0 and 5.' });
      }
  
      if (!Array.isArray(tag)) {
        return res.status(400).json({ message: 'Tag must be provided as an array.' });
      }
  
      if (typeof stock !== 'number' || stock < 0) {
        return res.status(400).json({ message: 'Stock must be a positive number or zero.' });
      }
  
      if (typeof quantityInStock !== 'number' || quantityInStock < 0) {
        return res.status(400).json({ message: 'Quantity in stock must be a positive number or zero.' });
      }
  
      if (!sku || typeof sku !== 'string') {
        return res.status(400).json({ message: 'SKU is required and must be a string.' });
      }
  
      if (typeof category_id !== 'number' || category_id <= 0) {
        return res.status(400).json({ message: 'Category ID is required and must be a positive number.' });
      }
  
      if (typeof supplier_id !== 'number' || supplier_id <= 0) {
        return res.status(400).json({ message: 'Supplier ID is required and must be a positive number.' });
      }
  
      if (!categoryName || typeof categoryName !== 'string') {
        return res.status(400).json({ message: 'Category name is required and must be a string.' });
      }
  
      if (status !== 'active' && status !== 'inactive') {
        return res.status(400).json({ message: 'Status must be either "active" or "inactive".' });
      }
  
      if (!Array.isArray(variants)) {
        return res.status(400).json({ message: 'Variants must be provided as an array.' });
      }
  
      for (const variant of variants) {
        if (!variant.key || typeof variant.key !== 'string') {
          return res.status(400).json({ message: 'Variant key is required and must be a string.' });
        }
  
        if (!Array.isArray(variant.values) || variant.values.length === 0) {
          return res.status(400).json({ message: 'Variant values must be provided as a non-empty array.' });
        }
  
        if (!Array.isArray(variant.optionValues)) {
          return res.status(400).json({ message: 'Option values for variant must be provided as an array.' });
        }
  
        for (const optionValue of variant.optionValues) {
          if (!optionValue.id || typeof optionValue.id !== 'string') {
            return res.status(400).json({ message: 'Option value ID is required and must be a string.' });
          }
  
          if (!optionValue.name || typeof optionValue.name !== 'string') {
            return res.status(400).json({ message: 'Option value name is required and must be a string.' });
          }
  
          if (!optionValue.variantSku || typeof optionValue.variantSku !== 'string') {
            return res.status(400).json({ message: 'Variant SKU is required and must be a string.' });
          }
        }
      }
    }
  
    next();
  };
  


  

  module.exports = {
    validateProduct,
    validateVariants,
    validateBulkProducts
  };
  