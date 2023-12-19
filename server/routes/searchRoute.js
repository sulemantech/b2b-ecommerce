// const express = require('express')
// const router = express.Router();
// const {Op}= require('sequelize')
// const productModel = require('../models/productModel');
// const productImages= require('../models/productImages');
// const categoryModel=require('../models/categoryModel');

// router.get('/', async (req, res) => {
//     const { search } = req.query;
  
//     try {
//       let whereClause = {};
//       const processedSearch = search ? search.replace(/\s+/g, ' ').trim() : null;
//       // Add conditions based on the provided parameters
//       if (processedSearch) {
//         // Search by product name
//         whereClause[Op.or] = [
//           {
//             // Preprocess the name and compare
//             name: {
//               [Op.iLike]: `%${processedSearch}%`,
//             },
//           },
//           {
//             // Preprocess the SKU and compare
//             sku: {
//               [Op.iLike]: `%${processedSearch}%`,
//             },
//           },
//           {
//             // Search by price
//             price: parseFloat(search) || 0,
//           },
//         ];
      
//       }
      
  
//       const searchResults = await productModel.findAll({
//         where: whereClause,
//         include: [
//           {
//             model: productImages,
//             where: { productId: { [Op.col]: 'products.id' } },
//             attributes: ['images'],
//           },
//           {
//             model: categoryModel,
//             attributes: ['name'],
//           },
//         ],
//       });
  
//       // If results are found, return them
//       if (searchResults.length > 0) {
//         return res.status(200).json(searchResults);
//       }
  
//       // If no results for product name, check for category name
//       const categoryResult = await categoryModel.findOne({
//         where: { name: search },
//         include: [
//           {
//             model: productModel,
//             attributes: ['id', 'name', 'description', 'price', 'quantity'],
//             include: {
//               model: productImages,
//               attributes: ['images'],
//             },
//           },
//         ],
//       });
  
//       // If category found, return its products
//       if (categoryResult) {
//         return res.status(200).json(categoryResult.products);
//       }
  
//       // If neither product nor category found, return 404
//       return res.status(404).json({ message: 'No matching products or categories found' });
//     } catch (error) {
//       console.error('Error during search:', error.message);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   });

//   module.exports = router;