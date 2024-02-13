const swaggerAutogen = require('swagger-autogen')();
const path = require('path');

const outputFile = './swagger-output.json';
const routesDirectory = './routes';

const doc = {
  info: {
    title: 'Your API Documentation',
    version: '1.0.0',
    description: 'Documentation for your Express.js API',
  },
  host: 'localhost:5001',  // Update with your server's host and port
  basePath: '/',
  schemes: ['http'],
  consumes: ['application/json'],
  produces: ['application/json'],
  tags: [],  // Array to hold tags
  definitions: {},  // Object to hold reusable definitions if needed
};

// Load route files dynamically
const routes = require('fs').readdirSync(routesDirectory).map(file => path.join(routesDirectory, file));



swaggerAutogen(outputFile, routes, doc).then(() => {
  console.log('Swagger file generated successfully.');
});
