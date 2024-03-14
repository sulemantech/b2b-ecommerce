const express = require('express');
const router = express.Router();
const { upload } = require('../middlewares/multerMiddleware.js');
const productImagesController = require('../controllers/productImagesController.js');

router.post('/productImages/', upload, productImagesController.uploadProduct);
router.get('/productImages/get', productImagesController.getAllProduct);
router.delete('/productImages/:productId', productImagesController.deleteProduct);
router.put('/productImages/update/:id', upload, productImagesController.updateProduct);
// router.get("/api/ping/me", productImagesController.pingMe)
module.exports = router

