const express=require('express');
const { ApolloServer } = require('apollo-server-express');
const cors =require('cors');
const productRoutes = require('./routes/productRoutes');
const productImages =require('./routes/productImages');
const categoryRoute= require('./routes/categoryRoute')
const supplierRoute= require('./routes/supplierRoute')
const cookieParser = require('cookie-parser');
const userRoute= require('./routes/userRoute')
const stateRoute= require('./routes/stateRoute')
const citiesRoute=require('./routes/citiesRoute')
const addressRoute =require('./routes/addressRoute');
// const orderRoute=require('./routes/orderRoute')
const orderRoute=require('./routes/orderRoute')
const orderItemsRoute=require('./routes/orderItemsRoute')
const companiesRoute=require('./routes/companiesRoute')
const searchRoute= require('./routes/searchRoute')
const typeDefs = require('./schema/graphqlSchema');
const resolvers = require('./resolvers/resolver');
const path = require('path');
const customerRoute=require('./routes/customerRoute')
const businessRoute=require('./routes/businessRoute')
const swaggerUi = require('swagger-ui-express');
const authRoutes = require('./routes/authRoutes');
const notificationRoute=require('./routes/notificationRoute')
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());
const port = process.env.PORT || 5001;
app.use(cookieParser());

app.get('/', (req,res)=>{
    res.send("getting ")
})

const server = new ApolloServer({
  typeDefs,
  resolvers,
});


//authRoute firebase
app.use('/verify-id-token', authRoutes);

//notification
app.use('/notifications',notificationRoute)

//swagger Api's
app.use('/n5store', swaggerUi.serve, swaggerUi.setup(require('./swagger_output.json')));

//products
app.use('/api/products/', productRoutes);


//supplier
app.use('/api/suppliers', supplierRoute);

//signin route
app.use('/api/signin', userRoute)

//productImagePost
app.use('/productImages', productImages)
// app.use('/categories', category_route)

app.use('/api/categories', categoryRoute)

//cities
app.use('/api/cities',citiesRoute)

//state
app.use('/api/state',stateRoute)

//addresses
app.use('/api/address',addressRoute)

//order
app.use('/api/order',orderRoute)

//orderItems
app.use('/api/orderitems', orderItemsRoute)

//companies
app.use('/api/company',companiesRoute)

//customer
app.use('/api/customer',customerRoute)

app.use('/api/business',businessRoute)

//searching
const search='/api/product/'


// Serve static files from the 'images' directory 
app.use('/assets',express.static(path.join(__dirname, 'assets')));

//Start the ApolloServer before applying middleware
async function startApolloServer() {
  await server.start();
  server.applyMiddleware({ app, path: search });
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}
startApolloServer()


