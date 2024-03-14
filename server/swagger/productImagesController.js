
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

    // Check if the product image exists
    const existingProductImage = await productImagesModel.findByPk(productId);
    console.log(existingProductImage);
    if (!existingProductImage) {
      return res.status(404).json({ error: 'Product image not found' });
    }

    // Delete all product images for the given productId
    await productImagesModel.destroy({
      where: {
        id: productId
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
      path: '/api/productImages/get',
      method: getAllProduct,
    },
  ],
  
  // Define routes for uploading product images
  post: [
    {
      path: '/api/productImages/',
      middleware:upload,
      method: uploadProduct,
    },
  ],
  
  // // Define routes for deleting product images
  delete: [
    {
      path: '/api/productImages/:productId',
      method: deleteProduct,
    },
  ],
  
  // // Define routes for updating product images
  put: [
    {
      path: '/api/productImages/update/:id',
      method: updateProduct,
      middleware:upload,
    },
  ],
};
app.use(function multerMiddleware (req, res, next) {
    if (!is(req, ['multipart'])) return next()

    var options = setup()

    var limits = options.limits
    var storage = options.storage
    var fileFilter = options.fileFilter
    var fileStrategy = options.fileStrategy
    var preservePath = options.preservePath

    req.body = Object.create(null)

    var busboy

    try {
      busboy = Busboy({ headers: req.headers, limits: limits, preservePath: preservePath })
    } catch (err) {
      return next(err)
    }

    var appender = new FileAppender(fileStrategy, req)
    var isDone = false
    var readFinished = false
    var errorOccured = false
    var pendingWrites = new Counter()
    var uploadedFiles = []

    function done (err) {
      if (isDone) return
      isDone = true
      req.unpipe(busboy)
      busboy.removeAllListeners()
      next(err)
    }

    function indicateDone () {
      if (readFinished && pendingWrites.isZero() && !errorOccured) done()
    }

    function abortWithError (uploadError) {
      if (errorOccured) return
      errorOccured = true

      pendingWrites.onceZero(function () {
        function remove (file, cb) {
          storage._removeFile(req, file, cb)
        }

        removeUploadedFiles(uploadedFiles, remove, function (err, storageErrors) {
          if (err) return done(err)

          uploadError.storageErrors = storageErrors
          done(uploadError)
        })
      })
    }

    function abortWithCode (code, optionalField) {
      abortWithError(new MulterError(code, optionalField))
    }

    // handle text field data
    busboy.on('field', function (fieldname, value, { nameTruncated, valueTruncated }) {
      if (fieldname == null) return abortWithCode('MISSING_FIELD_NAME')
      if (nameTruncated) return abortWithCode('LIMIT_FIELD_KEY')
      if (valueTruncated) return abortWithCode('LIMIT_FIELD_VALUE', fieldname)

      // Work around bug in Busboy (https://github.com/mscdex/busboy/issues/6)
      if (limits && Object.prototype.hasOwnProperty.call(limits, 'fieldNameSize')) {
        if (fieldname.length > limits.fieldNameSize) return abortWithCode('LIMIT_FIELD_KEY')
      }

      appendField(req.body, fieldname, value)
    })

    // handle files
    busboy.on('file', function (fieldname, fileStream, { filename, encoding, mimeType }) {
      // don't attach to the files object, if there is no file
      if (!filename) return fileStream.resume()

      // Work around bug in Busboy (https://github.com/mscdex/busboy/issues/6)
      if (limits && Object.prototype.hasOwnProperty.call(limits, 'fieldNameSize')) {
        if (fieldname.length > limits.fieldNameSize) return abortWithCode('LIMIT_FIELD_KEY')
      }

      var file = {
        fieldname: fieldname,
        originalname: filename,
        encoding: encoding,
        mimetype: mimeType
      }

      var placeholder = appender.insertPlaceholder(file)

      fileFilter(req, file, function (err, includeFile) {
        if (err) {
          appender.removePlaceholder(placeholder)
          return abortWithError(err)
        }

        if (!includeFile) {
          appender.removePlaceholder(placeholder)
          return fileStream.resume()
        }

        var aborting = false
        pendingWrites.increment()

        Object.defineProperty(file, 'stream', {
          configurable: true,
          enumerable: false,
          value: fileStream
        })

        fileStream.on('error', function (err) {
          pendingWrites.decrement()
          abortWithError(err)
        })

        fileStream.on('limit', function () {
          aborting = true
          abortWithCode('LIMIT_FILE_SIZE', fieldname)
        })

        storage._handleFile(req, file, function (err, info) {
          if (aborting) {
            appender.removePlaceholder(placeholder)
            uploadedFiles.push(extend(file, info))
            return pendingWrites.decrement()
          }

          if (err) {
            appender.removePlaceholder(placeholder)
            pendingWrites.decrement()
            return abortWithError(err)
          }

          var fileInfo = extend(file, info)

          appender.replacePlaceholder(placeholder, fileInfo)
          uploadedFiles.push(fileInfo)
          pendingWrites.decrement()
          indicateDone()
        })
      })
    })

    busboy.on('error', function (err) { abortWithError(err) })
    busboy.on('partsLimit', function () { abortWithCode('LIMIT_PART_COUNT') })
    busboy.on('filesLimit', function () { abortWithCode('LIMIT_FILE_COUNT') })
    busboy.on('fieldsLimit', function () { abortWithCode('LIMIT_FIELD_COUNT') })
    busboy.on('close', function () {
      readFinished = true
      indicateDone()
    })

    req.pipe(busboy)
  })


        /**
          * @swagger
          * /api/productImages/get:
          *  get:
          *   tags:
          *  - productImagesController
          

          */
          
app.get('/api/productImages/get',async (req, res) => {
 // #swagger.tags = ['productImagesController']
  {
  try {
    const productImages = await productImagesModel.findAll(); // Changed variable name here
    res.json(productImages);
  } catch (error) {
    console.error('Error getting product images:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
})


        /**
          * @swagger
          * /api/productImages/:
          *  post:
          *   tags:
          *  - productImagesController
          

          */
          
app.post('/api/productImages/',async (req, res) => {
 // #swagger.tags = ['productImagesController']
  {
  
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
}
})


        /**
          * @swagger
          * /api/productImages/update/:id:
          *  put:
          *   tags:
          *  - productImagesController
          

          */
          
app.put('/api/productImages/update/:id',async (req, res) => {
 // #swagger.tags = ['productImagesController']
  {
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
}
})


        /**
          * @swagger
          * /api/productImages/:productId:
          *  delete:
          *   tags:
          *  - productImagesController
          

          */
          
app.delete('/api/productImages/:productId',async (req, res) => {
 // #swagger.tags = ['productImagesController']
  {
  
  try {
    const { productId } = req.params;

    // Check if the product image exists
    const existingProductImage = await productImagesModel.findByPk(productId);
    console.log(existingProductImage);
    if (!existingProductImage) {
      return res.status(404).json({ error: 'Product image not found' });
    }

    // Delete all product images for the given productId
    await productImagesModel.destroy({
      where: {
        id: productId
      }
    });

    res.json({ message: 'Product images deleted successfully for the specified productId' });
  } catch (error) {
    console.error('Error deleting product images:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
})
