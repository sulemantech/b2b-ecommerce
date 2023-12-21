
const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Product {
    id: ID!
    name: String
    description: String
    price: Float
    images: [String]
    sku: String
    productImages: [ProductImage]
  }
  type ProductImage {
    date: String
    images: [String]
  }

  type Category {
    name: String
    products: [Product]
    
  }
  type Order {
    orderId: ID!
    userId: ID!
    address: String!
    orderDate: String!
    totalPrice: Float!
    status: String!
    discount: Int!
    paymentMethod: String!
    trackingNumber: Int!
    name: String!
    email: String!
    contactNumber: Int!
    zipCode: Int
    additionalInfo: String
    city: String!
    country: String!
  }

  type Query {
    search(query: String): [Product]
    getAllOrders: [Order]
  }
`;

module.exports = typeDefs;