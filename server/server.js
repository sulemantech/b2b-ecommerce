const express = require('express');
// const bodyParser = require('body-parser');
const cors =require('cors');
const productRoutes = require('./routes/productRoutes');
const productImages =require('./routes/productImages')


const app = express();
app.use(express.json());
app.use(cors());
const port =5000;

app.get('/', (req,res)=>{
    res.send("getting ")
})


// Use product routes
app.use('/api', productRoutes);

app.use('/imagess', express.static('./imagess'))


//productImagePost
app.use('/productImages', productImages)

//productImageget
app.use('/get', productImages)

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
