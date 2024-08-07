const { upload } = require('../middlewares/multerMiddleware');
let productImagesModel = require('../models/productImages');
const path = require('path');
let uploadProduct = async (req, res) => {
  
  const images = req.files.map(file => '/' + (file.path && file.path.split(path.sep).join('/')));
  // console.log("rrrrrrrrrrRR",req.files.map(file => '/' + (file.path && file.path.split(path.sep).join('/'))))
  try {
    const { productId, id } = req.body;
     console.log(`/\\/g`,images);

    const newProductImage = await productImagesModel.create({
      images,
      productId,
      id,
    });

    res.status(201).json(newProductImage);
  } catch (error) {
    console.error('Error creating product image:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

let getAllProduct = async (req, res) => {
  try {
    const productImages = await productImagesModel.findAll(); // Changed variable name here
    res.json(productImages);
  } catch (error) {
    console.error('Error getting product images:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

let deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    // Check if the product images exist
    const existingProductImages = await productImagesModel.findAll({
      where: {
        productId: productId
      }
    });

    if (!existingProductImages || existingProductImages.length === 0) {
      return res.status(404).json({ error: 'Product images not found' });
    }

    // Delete all product images for the given productId
    await productImagesModel.destroy({
      where: {
        productId: productId
      }
    });

    res.json({ message: 'Product images deleted successfully for the specified productId' });
  } catch (error) {
    console.error('Error deleting product images:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


let updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { productId } = req.body;

    const existingProductImage = await productImagesModel.findByPk(id);

    if (!existingProductImage) {
      return res.status(404).json({ error: 'Product image not found' });
    }

     const updatedImages = req.files.map(file => '/' + (file.path && file.path.split(path.sep).join('/')));

    existingProductImage.images = updatedImages;
    existingProductImage.productId = productId;

    await existingProductImage.save();

    res.json(existingProductImage);
  } catch (error) {
    console.error('Error updating product image: ', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  // Define route handlers
  uploadProduct,
  getAllProduct,
  deleteProduct,
  updateProduct,


  middleware: [
    upload,
    
  ],
  // Define routes for getting all product images
  get: [
    {
      path: '/productImages/get',
      method: getAllProduct,
    },
  ],
  
  // Define routes for uploading product images
  post: [
    {
      path: '/productImages/',
      middleware:upload,
      method: uploadProduct,
    },
  ],
  
  // // Define routes for deleting product images
  delete: [
    {
      path: '/productImages/:productId',
      method: deleteProduct,
    },
  ],
  
  // // Define routes for updating product images
  put: [
    {
      path: '/productImages/update/:id',
      method: updateProduct,
      middleware:upload,
    },
  ],
};
