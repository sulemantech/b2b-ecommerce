const express = require('express');
const router = express.Router();
const { upload } = require('../middlewares/multerMiddleware.js');
const productImagesController = require('../controllers/productImagesController.js');

router.post('/api/productImages/', upload, productImagesController.uploadProduct);
router.get('/api/productImages/get', productImagesController.getAllProduct);
router.delete('/api/productImages/:productId', productImagesController.deleteProduct);
router.put('/api/productImages/update/:id', upload, productImagesController.updateProduct);
// router.get("/api/ping/me", productImagesController.pingMe)
module.exports = router

