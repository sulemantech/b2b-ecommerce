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

// Bulk post API
router.post('/bulk', async (req, res) => {
  try {
    const products = req.body; 
    
    if (!Array.isArray(products)) {
      return res.status(400).json({ error: 'Invalid input. Expected an array of products.' });
    }

    // Use Promise.all to asynchronously create all products
    const createdProducts = await Promise.all(products.map(async (product) => {
      const {
        id, name, description, price, quantity, manufacturer, dateAdded, quantityInStock, sku,
        discount, new: isNew, rating, saleCount, category_id, tag, stock, supplier_id, categoryName
      } = product;

      const newData = await productModel.create({
        id, name, description, price, quantity, manufacturer, dateAdded, quantityInStock, sku,
        discount, new: isNew, rating, saleCount, category_id, tag, stock, supplier_id, categoryName
      });

      const category = await categoryModel.findByPk(category_id);

      if (category) {
        // Associate the product with the category
        await newData.addCategory(category, { through: { id: category_id } });
        return newData;
      } else {
        throw new Error(`Category not found for product with id: ${id}`);
      }
    }));

    res.status(201).json({ message: 'Products created and associated with categories.', createdProducts });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Common function to handle pagination
const paginateResults = (page = 1, pageSize = 20) => ({
  offset: (page - 1) * pageSize,
  limit: pageSize,
});

// GET API with pagination ///////////////////////////////////////////////////////
router.get('/all', async (req, res) => {
  const page = req.query.page || 1;
  const pageSize = req.query.pageSize || 20;
  const status = req.query.status; 
  try {
    const { offset, limit } = paginateResults(page, pageSize);

    const whereClause = {};
    
    // If status is provided, add it to the where clause
    if (status) {
      whereClause.status = status.toLowerCase();
    }
    const allProducts = await productModel.findAll({
      where: whereClause,
      include: {
        model: productImages,
        where: { productId: { [Op.col]: 'products.id' } },
        attributes: ['date', 'images'],
        required: false,
      },
      order: [['id', 'ASC']],
      ...paginateResults(page, pageSize),
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

// GET API to get a specific product by ID
router.get('/specific/:id', async (req, res) => {
  const productId = req.params.id;

  try {
    const product = await productModel.findByPk(productId, {
      include: {
        model: productImages,
        where: { productId: { [Op.col]: 'products.id' } },
        attributes: ['date', 'images'],
      },
    });

    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
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


// DELETE API    ///////////////////////////////////////////////////////////////////
router.delete('/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await productModel.findByPk(productId);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    const deletedProductDetails = {
      id: product.id,
      name: product.name,
      price: product.price
    };

    // Delete the product
    await product.destroy();

    res.status(200).json({
      message: 'Product deleted successfully',
      deletedProduct: deletedProductDetails,
    });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



module.exports = router;
