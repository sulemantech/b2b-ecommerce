const express = require('express');
const cors =require('cors');
const productRoutes = require('./routes/productRoutes');
const productImages =require('./routes/productImages');
const categoryRoute= require('./routes/categoryRoute')
const supplierRoute= require('./routes/supplierRoute')
const cookieParser = require('cookie-parser');
const signinRoute = require('./routes/signinRoute')
const stateRoute= require('./routes/stateRoute')
const citiesRoute=require('./routes/citiesRoute')
const addressRoute =require('./routes/addressRoute');
// const orderRoute=require('./routes/orderRoute')
const orderRoute=require('./routes/orderRoute')

require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());
const port = process.env.PORT || 5001;
app.use(cookieParser());

app.get('/', (req,res)=>{
    res.send("getting ")
})

//products
app.use('/api/products/', productRoutes);

//supplier
app.use('/api/suppliers', supplierRoute);

//signin route
app.use('/api/signin', signinRoute)

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


// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
