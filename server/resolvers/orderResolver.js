// const OrderModel = require('../models/orderModel');
// const RegisterationModel = require('../models/registerationModel');
// const OrderItemsModel = require('../models/orderItemsModel');

// const orderResolver = {
//   Query: {
//     // getOrderById: async (_, { orderId }) => {
//     //   try {
//     //     const order = await OrderModel.findByPk(orderId, {
//     //       include: [
//     //         {
//     //           model: RegisterationModel,
//     //           attributes: ['id', 'firstname', 'lastname', 'contactNumber', 'email'],
//     //         },
//     //         {
//     //           model: OrderItemsModel,
//     //           attributes: ['orderId', 'productId', 'quantity', 'price', 'discount', 'totalPrice'],
//     //         },
//     //       ],
//     //     });

//     //     return order;
//     //   } catch (error) {
//     //     console.error('Error fetching order by ID:', error.message);
//     //     throw new Error('Internal Server Error');
//     //   }
//     // },

//     getAllOrders: async () => {
//       try {
//         const orders = await OrderModel.findAll({
//           include: [
//             {
//               model: RegisterationModel,
//               attributes: ['id', 'firstname', 'lastname', 'contactNumber', 'email'],
//             },
//             {
//               model: OrderItemsModel,
//               attributes: ['orderId', 'productId', 'quantity', 'price', 'discount', 'totalPrice'],
//             },
//           ],
//         });

//         return orders;
//       } catch (error) {
//         console.error('Error fetching all orders:', error.message);
//         throw new Error('Internal Server Error');
//       }
//     },

//     getUserOrders: async (_, { userId }) => {
//       try {
//         const userOrders = await OrderModel.findAll({
//           where: { userId },
//           include: [
//             {
//               model: RegisterationModel,
//               attributes: ['id', 'firstname', 'lastname', 'contactNumber', 'email'],
//             },
//             {
//               model: OrderItemsModel,
//               attributes: ['orderId', 'productId', 'quantity', 'price', 'discount', 'totalPrice'],
//             },
//           ],
//         });

//         return userOrders;
//       } catch (error) {
//         console.error('Error fetching user orders:', error.message);
//         throw new Error('Internal Server Error');
//       }
//     },
//   },

// //   Mutation: {
// //     createOrder: async (_, { orderInput }) => {
// //       const {
// //         userId,
// //         address,
// //         orderDate,
// //         totalPrice,
// //         status,
// //         discount,
// //         paymentMethod,
// //         trackingNumber,
// //         name,
// //         email,
// //         contactNumber,
// //         zipCode,
// //         additionalInfo,
// //         city,
// //         country,
// //       } = orderInput;

// //       try {
// //         // Create a new order
// //         const order = await OrderModel.create({
// //           userId,
// //           address,
// //           orderDate,
// //           totalPrice,
// //           status,
// //           discount,
// //           paymentMethod,
// //           trackingNumber,
// //           name,
// //           email,
// //           contactNumber,
// //           zipCode,
// //           additionalInfo,
// //           city,
// //           country,
// //         });

// //         return order;
// //       } catch (error) {
// //         console.error('Error creating order:', error.message);
// //         throw new Error('Internal Server Error');
// //       }
// //     },
// //   },
// };

// module.exports = orderResolver;
