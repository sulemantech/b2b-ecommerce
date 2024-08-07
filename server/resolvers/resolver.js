const { Op } = require('sequelize');
const productModel = require('../models/productModel');
const productImages = require('../models/productImages');
const categoryModel = require('../models/categoryModel');
const orderModel = require('../models/orderModel');
const registerationModel = require('../models/registerationModel');
const orderItemsModel = require('../models/orderItemsModel');

const resolvers = {
  Query: {
    search: async (_, { query }) => {
      try {
        let whereClause = {};

        // Add conditions based on the provided parameters
        if (query) {
          // Search by product name, SKU, or price
          whereClause[Op.or] = [
            {
              name: {
                [Op.like]: `%${query}%`,
              },
            },
            {
              sku: {
                [Op.like]: `%${query}%`,
              },
            },
            {
              price: parseFloat(query) || 0,
            },
          ];
        }

        // Fetch data using Sequelize
        const productSearchResults = await productModel.findAll({
          where: whereClause,
          include: [
            {
              model: productImages,
              where: { productId: { [Op.col]: 'products.id' } },
              attributes: ['images'],
            },
            {
              model: categoryModel,
              attributes: ['name'],
            },
          ],
        });

        // If products are found, return them
        if (productSearchResults.length > 0) {
          return productSearchResults;
        }


        // Combine and return both product and order search results
        return [...productSearchResults];
      } catch (error) {
        console.error('Error during search:', error.message);
        throw new Error('Internal Server Error');
      }
    },

    ///////////////
    getAllOrders: async () => {
      try {
        const orders = await orderModel.findAll({
           include: [
            {
              model: registerationModel,
              attributes: ['id', 'firstname', 'lastname', 'contactNumber', 'email'],
            },
            {
              model: orderItemsModel,
              attributes: ['orderId', 'productId', 'quantity', 'price', 'discount', 'totalPrice'],
            },
          ],
        });

        return orders;
      } catch (error) {
        console.error('Error fetching all orders:', error.message);
        throw new Error('Internal Server Error');
      }
    },
  },
};

module.exports = resolvers;
