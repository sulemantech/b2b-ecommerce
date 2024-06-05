// const multer = require('multer');
// const path = require('path');
// const categoryModel=require('../models/categoryModel');
const express = require('express')
const Sequelize=require('sequelize')
const {Op}= require('sequelize')
const productModel = require('../models/productModel');
const productImages= require('../models/productImages');
const FlashDeal=require('../models/FlashDealModel')
const productVariantModel=require('../models/productVariantModel')


//post API    ///

/////////////////////////////////////////////////////////////////////////////////////////////////////grouping variants//////////////////
// const createProductAndVariants = async (req, res) => {
//   try {
//     const { products, variants } = req.body;
//     const Product = await productModel.create(products);
//     const colorMap = new Map();
//     const sizeSet = new Set();

//     // Iterate over each variant to group them
//     for (const variant of variants) {
//       const { color, size } = variant;

//       // Add color and size to the appropriate collections
//       if (Array.isArray(color)) {
//         color.forEach((col) => {
//           if (!colorMap.has(col)) {
//             colorMap.set(col, []);
//           }
//           colorMap.get(col).push(size);
//         });
//       }

//       if (size) {
//         sizeSet.add(size);
//       }
//     }

//     // Convert colorMap and sizeSet to arrays
//     const colors = Array.from(colorMap.keys());
//     const sizes = Array.from(sizeSet);

//     const colorVariant = await productVariantModel.create({
//       key: 'color',
//       value: colors, // Store as an array
//       productId: Product.id,
//     });

//     const sizeVariant = await productVariantModel.create({
//       key: 'size',
//       value: sizes, // Store as an array
//       productId: Product.id,
//     });

//     res.status(201).json({
//       message: 'Product and Variants created.',
//       Product,
//       Variants: [colorVariant, sizeVariant],
//     });
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };
const createProductAndVariants = async (req, res) => {
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
};







// Bulk post API and its variants 
const createBulkProducts = async (req, res) => {
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
};


// Common function to handle pagination
const paginateResults = (page = 1, pageSize = 20) => ({
  offset: (page - 1) * pageSize,
  limit: pageSize,
});

//get api with pagination
// Common function to get products based on user role and other criteria
const getProductsByUserRole = async (req, res, whereClause, page, pageSize) => {
  // const page = req.query.page || 1;
  // const pageSize = req.query.pageSize || 20;
  const status = req.query.status; 

  try {
    const { offset, limit } = paginateResults(page, pageSize);
    console.log("funccccccccpage,pageSize",page,pageSize);
    console.log("funccccccccoffset, limit",offset, limit);
    // If status is provided, add it to the where clause
    if (status) {
      whereClause.status = status.toLowerCase();
    }

    const allProducts = await productModel.findAll({
      where: {
        supplier_id: `${whereClause.supplier_id}` 
      },
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
          required: false,
        }
      ],
      order: [['id', 'ASC']],
      offset, limit
    });

    return allProducts;
  } catch (error) {
    throw new Error('Internal Server Error');
  }
};

// Route handler for '/all' with token verification
const getAllProductsByUserRole = async (req, res) => {
  const userRole = req.user.role;
  const whereClause = {};
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 20;
  console.log(page,pageSize);

  if (userRole === 'admin' || userRole === 'user') {
    // Admin and user can view all products without any filtering
  } else if (userRole === 'supplier') {
    // Supplier can view products associated with their userId
    console.log("req.user.vendorId",req.user.vendorid);
    whereClause.supplier_id = req.user.vendorid;
  }

  try {
    const allProducts = await getProductsByUserRole(req, res, whereClause,page, pageSize);
    res.status(200).json(allProducts);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Route handler for '/clients/all' without token verification
const getAllProductsForClients = async (req,res) => {
  try {
    const allProducts = await productModel.findAll({
      include: [
        {
          model: productImages,
          where: { productId: { [Op.col]: 'products.id' } },
          attributes: ['date', 'images'],
          required: false,
        },
        {
          model: productVariantModel,
          attributes: [ 'weight', 'unit', 'key', 'value', 'availableQuantity', 'optionValues'],
          required: false,
        },
        {
          model: FlashDeal,
          attributes: ['discountPercentage', 'startTime', 'endTime', 'isLimitedTime'],
          required: false,
        },
       
      ],
      order: [['id', 'ASC']],
    });
    res.status(200).json(allProducts);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


// Route handler for '/clients/all' with token verification
const getAllProductsForClientsSortPrice = async (req,res) => {
  try {
    const { sortBy } = req.query;
    let sortOrder = [['id', 'ASC']]; // Default sort order

    // Check sortBy parameter to determine the sorting order
    if (sortBy === 'low_to_high') {
      sortOrder = [['price', 'ASC']];
    } else if (sortBy === 'high_to_low') {
      sortOrder = [['price', 'DESC']];
    }

    // Fetch all products with associated product images
    const allProducts = await productModel.findAll({
      include: [
        {
          model: productImages,
          where: { productId: Sequelize.col('products.id') }, // Use Sequelize.col for referencing column names
          attributes: ['date', 'images']
        }
      ],
      order: sortOrder // Apply the determined sort order
    });

    // Send the JSON response
    res.status(200).json(allProducts);
  } catch (error) {
    console.error('Error:', error.stack);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



const getProductsByCategoryId = async (req,res) => {
  const category_id = req.params.category_id;

  try {
    const productsInCategory = await productModel.findAll({
      where: { category_id: { [Op.in]: category_id.split(',') } },
      include: {
        model: productImages,
        where: { productId: { [Op.col]: 'products.id' } }, 
        attributes: ['date', 'images'],
        required: false,
      },
    });

    res.status(200).json(productsInCategory);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// GET API to get a specific product by ID
const getProductById = async (req,res) => {
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
};


// PUT API    /////////////////////////////////////////////////////////////////// /:productId
const updateProductAndVariants = async (req,res) => {
  try {
    const productId = req.params.productId;
    const { products, variants } = req.body;

    // Check if the product exists
    const existingProduct = await productModel.findByPk(productId);
    if (!existingProduct) {
      return res.status(404).json({ message: 'Product123 not found.' });
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
          return existingVariant.toJSON();
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
};
  

// Delete product and its variants by ID /////////////////////////////////////////////////////////////////// /:productId
const deleteProductAndVariants = async (req,res) => {
  try {
    const productId = req.params.productId;

    // Check if the product exists
    const existingProduct = await productModel.findByPk(productId);
    if (!existingProduct) {
      return res.status(404).json({ message: 'Product not found4.' });
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
};

  const deleteVariant = async (req, res) => {
  try {
    const variantId = req.params.variantId;

    // Check if the variant exists
    const existingVariant = await productVariantModel.findByPk(variantId);
    if (!existingVariant) {
      return res.status(404).json({ message: 'Variant not found.' });
    }

    // Delete the variant
    await existingVariant.destroy();

    res.status(200).json({ message: 'Variant deleted successfully.' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateBulkProducts = async (req, res) => {
  try {
    const { products, variants } = req.body;
    let updatedProducts = [];
    await Promise.all(
      products.map(async (productData) => {
        const productId = productData.id;
        console.log("idddddddddddddddddddddddddd",productId)
        const existingProduct = await productModel.findByPk(productId);
        if (!existingProduct) {
          throw new Error(`Product with ID ${productId} not found.`);
        }

        await existingProduct.update(productData);
        const updatedProduct = await productModel.findByPk(productId);
        updatedProducts.push(updatedProduct.toJSON()); // Push the updated product into the array
      })
    );


    const updatedVariants = await Promise.all(
      variants.map(async ({ id, key, values, optionValues, ...rest }) => {
        const existingVariant = await productVariantModel.findByPk(id);

        if (existingVariant) {
          await existingVariant.update({
            ...rest,
            key,
            value: values,
            optionValues,
            productId: existingVariant.productId,
          });

          return existingVariant.toJSON();
        } else {
          const newVariant = await productVariantModel.create({
            ...rest,
            key,
            value: values,
            optionValues,
            productId: existingVariant.productId,
          });

          return newVariant.toJSON();
        }
      })
    );

    res.status(200).json({
      message: 'Products and Variants updated successfully.',
      updatedProducts,
      updatedVariants,
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// const updateBulkProducts = async (req, res) => {
//   try {
//     const { products, variants } = req.body;
//     let updatedProducts = [];
//     await Promise.all(
//       products.map(async (productData) => {
//         const productId = productData.id;
//         const existingProduct = await productModel.findByPk(productId);
//         if (!existingProduct) {
//           throw new Error(`Product with ID ${productId} not found.`);
//         }

//         await existingProduct.update(productData);
//         const updatedProduct = await productModel.findByPk(productId);
//         updatedProducts.push(updatedProduct.toJSON()); // Push the updated product into the array
//       })
//     );

//     res.status(200).json({
//       message: 'Products updated successfully.',
//       updatedProducts,
//     });
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };






module.exports = {
  deleteVariant,deleteProductAndVariants,updateProductAndVariants,getProductById,getProductsByCategoryId,getAllProductsForClientsSortPrice,
  getAllProductsForClients,getAllProductsByUserRole,createBulkProducts,createProductAndVariants,updateBulkProducts,
  get: [
    {
      path: '/api/products/all',
      method: getAllProductsByUserRole,
    },
    {
      path: '/api/products/clients/all',
      method: getAllProductsForClients,
    },
    {
      path: '/api/products/clients/all/sort',
      method: getAllProductsForClientsSortPrice,
    },
    {
      path: '/api/products/category/:category_id',
      method: getProductsByCategoryId,
    },
    {
      path: '/api/products/:id',
      method: getProductById,
    },
  ],
  post: [
    {
      path: '/api/products/create',
      method: createProductAndVariants,
    },
    {
      path: '/api/products/createBulk',
      method: createBulkProducts,
    },
  ],
  put: [
    {
      path: '/api/products/:productId',
      method: updateProductAndVariants,
    },
    {
      path: '/api/bulk/products/update',
      method: updateBulkProducts,
    },
  ],
  delete: [
    {
      path: '/api/products/:productId',
      method: deleteProductAndVariants,
    },
    {
      path: '/api/products/variants/:variantId',
      method: deleteVariant,
    },
  ],
  
};
