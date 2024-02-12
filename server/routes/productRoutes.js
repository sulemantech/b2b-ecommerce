const express = require('express')
const router = express.Router();
const Sequelize=require('sequelize')
const multer = require('multer');
const {Op}= require('sequelize')
const path = require('path');
const productModel = require('../models/productModel');
const productImages= require('../models/productImages');
const categoryModel=require('../models/categoryModel');
const productVariantModel=require('../models/productVariantModel')

const { validateProduct, validateVariants } = require('../middlewares/validateVariantsMiddleware');

//post API    ///////////////////////////////////////////////////////////////////
router.post('/', async (req, res) => {
  try {
    const { products, variants } = req.body;
    // Create product record
    const Product = await productModel.create(products);
   
    // Create variant records
    const Variants = await Promise.all(
      variants.map(async ({ key, values,optionValues, ...rest }) => {
        return await productVariantModel.create({
          ...rest,
          key,
          value: values,optionValues,
          productId: Product.id, 
        });
      })
    );

    res.status(201).json({
      message: 'Product and Variants created.',
      Product,
      Variants,
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Bulk post API and its variants 
router.post('/bulk',validateProduct, validateVariants, async (req, res) => {
  try {
    const products = req.body;

    if (!Array.isArray(products)) {
      return res.status(400).json({ error: 'Invalid input. Expected an array of products.' });
    }

    // Use Promise.all to asynchronously create all products
    const createdProducts = await Promise.all(products.map(async (productData) => {
      const { variants, optionValues, ...rest } = productData;

      // Create product record
      const newProduct = await productModel.create({ ...rest });

      // Create variant records for the product
      const newVariants = await Promise.all(variants.map(async (variantData) => {
        const { optionValues: variantOptionValues, ...variantRest } = variantData;

        // Create variant record
        const newVariant = await productVariantModel.create({
          ...variantRest,
          productId: newProduct.id,
          optionValues: variantOptionValues, // Include optionValues directly in the creation
        });

        return { ...newVariant.toJSON() };
      }));

      return { product: newProduct.toJSON(), variants: newVariants };
    }));

    res.status(201).json({ message: 'Products created.', createdProducts });
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

// GET API with pagination /////////////////////////////////////////////
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
      include: [
        {
          model: productImages,
          where: { productId: { [Op.col]: 'products.id' } },
          attributes: ['date', 'images'],
          required: false,
        },
        {
          model: productVariantModel,
          attributes: ['type', 'weight', 'unit', 'key', 'value', 'availableQuantity', 'optionValues'],
          required: false, // Use false if you want left join
        },
        // {
        //   model: optionValueModel,
        //   attributes: ['id', 'name', 'variantSku'],
        //   required: false, // Use false if you want left join
        // },
      ],
      order: [['id', 'ASC']],
      ...paginateResults(page, pageSize),
    });

    res.status(200).json(allProducts);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



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
      include: [
        {
          model: productImages,
          where: { productId: { [Op.col]: 'products.id' } },
          attributes: ['date', 'images'],
          required:false
        },
        {
          model: productVariantModel,
          attributes: ['id','type', 'weight', 'unit', 'key', 'value', 'availableQuantity', 'optionValues'],
          required: false, 
        }
      ]
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
router.put('/:productId',  async (req, res) => {
  try {
    const productId = req.params.productId;
    const { products, variants } = req.body;

    // Check if the product exists
    const existingProduct = await productModel.findByPk(productId);
    if (!existingProduct) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    // Update product data
    await existingProduct.update(products);

    // Update or create variant records
    const updatedVariants = await Promise.all(
      variants.map(async ({ id, key, values, optionValues, ...rest }) => {
        // Check if the variant exists
        const existingVariant = await productVariantModel.findByPk(id);

        if (existingVariant) {
          // Update existing variant data
          await existingVariant.update({
            ...rest,
            key,
            value: values,
            optionValues,
            productId,
          });
        } else {
          // Create new variant if it doesn't exist
          const newVariant = await productVariantModel.create({
            ...rest,
            key,
            value: values,
            optionValues,
            productId,
          });

          return newVariant.toJSON();
        }
      })
    );

    res.status(200).json({
      message: 'Product and Variants updated successfully.',
      updatedProduct: existingProduct.toJSON(),
      updatedVariants,
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
  

// Delete product and its variants by ID ///////////////////////////////////////////////////////////////////
router.delete('/:productId', async (req, res) => {
  try {
    const productId = req.params.productId;

    // Check if the product exists
    const existingProduct = await productModel.findByPk(productId);
    if (!existingProduct) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    // Delete associated variants
    await productVariantModel.destroy({
      where: {
        productId: existingProduct.id,
      },
    });

    // Delete the product
    await existingProduct.destroy();

    res.status(200).json({ message: 'Product and Variants deleted successfully.' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = router;
