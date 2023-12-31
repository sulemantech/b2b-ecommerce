const express = require('express')
const router = express.Router();
const Sequelize=require('sequelize')
const multer = require('multer');
const {Op}= require('sequelize')
const path = require('path');
const productModel = require('../models/productModel');
const productImages= require('../models/productImages');
const categoryModel=require('../models/categoryModel');


//post API    ///////////////////////////////////////////////////////////////////
router.post('/', async(req, res) => {
  try {
    
    const {id,name,description,price,quantity, manufacturer,dateAdded,quantityInStock,sku,discount, new: isNew, rating, saleCount,  category_id, tag, stock,supplier_id, categoryName } = req.body;
    
  
    const newData = await productModel.create({ 
      id,
      name,
      description,
      price,
      quantity,
      manufacturer,
      dateAdded,
      quantityInStock,
      sku,      
      discount,
      new: isNew,
      rating,
      saleCount,
      category_id,
       tag,
      stock, supplier_id, categoryName
    });
    const category = await categoryModel.findByPk(category_id);
    
    if (category) {
      // Associate the product with the category
      await newData.addCategory(category, { through: { id: category_id } });
      
      res.status(201).json({ message: 'Product created and associated with category.', newData });
    } else {
      res.status(404).json({ message: 'Category not found.' });
    }
    
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET API    ///////////////////////////////////////////////////////////////////
router.get('/all', async (req, res) => {
  try {
    const allProducts = await productModel.findAll({
      include: {
        model: productImages,
        where: { productId: { [Op.col]: 'products.id' } }, 
        attributes: ['date', 'images'],
      },
    });
    res.status(200).json(allProducts);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET API    ///////////////////////////////////////////////////////////////////
router.get('/:category_id', async (req, res) => {
  const category_id = req.params.category_id;

  try {
    const productsInCategory = await productModel.findAll({
      where: { category_id: { [Op.in]: category_id.split(',') } },
      include: {
        model: productImages,
        where: { productId: { [Op.col]: 'products.id' } }, 
        attributes: ['date', 'images'],
      },
    });

    res.status(200).json(productsInCategory);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});





// PUT API    ///////////////////////////////////////////////////////////////////
router.put('/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const updatedProductData = req.body;

    // Find the product by ID
    const product = await productModel.findByPk(productId);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Update the product with new data
    await product.update(updatedProductData);

    res.status(200).json({ message: 'Product updated successfully', updatedProduct: product });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
//searching api based on name





module.exports = router;
