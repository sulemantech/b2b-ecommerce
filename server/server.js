const express=require('express');
const { ApolloServer } = require('apollo-server-express');
const cors =require('cors');
const productRoutes = require('./routes/productRoutes');
const productImagesRoute =require('./routes/productImagesRoute.js');
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
// const searchRoute= require('./routes/searchRoute')
const typeDefs = require('./schema/graphqlSchema');
const resolvers = require('./resolvers/resolver');
const path = require('path');
const customerRoute=require('./routes/customerRoute')
const businessRoute=require('./routes/businessRoute')
const DealRoute=require('./routes/DealRoutes.js')
const swaggerUi = require('swagger-ui-express');
// const authRoutes = require('./routes/authRoutes');
const notificationRoute=require('./routes/notificationRoute.js')
const sequelize = require('./config/config.js');
const WebSocket = require('ws');



require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());
const port = process.env.PORT || 5001;
app.use(cookieParser());

app.get('/', (req,res)=>{
    res.send("getting ")
})

const wss = new WebSocket.Server({ port: 8000 });

wss.on('connection', function connection(ws) {
    console.log('Client connected');

    ws.on('message', function incoming(message) {
        console.log('Received: %s', message);
        // Handle incoming messages (e.g., send notifications)
    });

    ws.on('close', function close() {
        console.log('Client disconnected');
    });
});

// Start the server


// sequelize.sync() // This will drop the existing tables and recreate them
//   .then(() => {
//     console.log('Database synchronized');
//   })
//   .catch(err => {
//     console.error('An error occurred while synchronizing the database:', err);
//   });


const server = new ApolloServer({
  typeDefs,
  resolvers,
});

//authRoute firebase
// app.use('/verify-id-token', authRoutes);


//notification
app.use('/notifications',notificationRoute)

//swagger Api's
// app.use('/n5store', swaggerUi.serve, swaggerUi.setup(require('./swagger_output.json')));

//products
app.use('/', productRoutes);


//supplier
app.use('/', supplierRoute);

//signin route
app.use('/', userRoute)

//productImagePost
app.use('/', productImagesRoute)
// app.use('/categories', category_route)

app.use('/', categoryRoute)

//cities
app.use('/',citiesRoute)

//state
app.use('/',stateRoute)

//addresses
app.use('/',addressRoute)

//order
app.use('/',orderRoute)

//orderItems
app.use('/', orderItemsRoute)

//companies
app.use('/',companiesRoute)
app.use('/',DealRoute);

//customer
app.use('/',customerRoute)

app.use('/',businessRoute)

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


