
const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Product {
    id: ID!
    name: String
    description: String
    price: Float
    images: [String]
    sku: String
    productImages:[ProductImage]
  }
  type ProductImage {
    date: String
    images: [String]
  }

  type Category {
    name: String
    products: [Product]
    
  }

  type Query {
    search(query: String): [Product]
  }
`;

module.exports = typeDefs;