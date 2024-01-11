const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, process.env.DESTINATION_PATH_FOR_IMAGES || './assets/products/');
  },
  filename: (req, file, cb) => {
    const name = file.originalname;
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'image' + '-' + uniqueSuffix + '-' + name);
  },
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: process.env.FILE_SIZE  }, // 15 megabytes 
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const mimeType = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname));

    if (mimeType && extname) {
      return cb(null, true);
    }
    cb('Give proper file');
  }
}).array('images', process.env.IMAGE_LIMIT || 3); // 3 images default

module.exports = { upload };
