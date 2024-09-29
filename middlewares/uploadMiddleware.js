// middleware/uploadMiddleware.js
const multer = require('multer');

// 使用内存存储
const storage = multer.memoryStorage();

const upload = multer({ storage });

module.exports = upload;
