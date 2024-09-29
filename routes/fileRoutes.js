// routes/fileRoutes.js
const express = require('express');
const upload = require('../middlewares/uploadMiddleware'); // 上传中间件
const { authenticate } = require('../middlewares/authMiddleware');
const fileController = require('../controllers/fileController');
const router = express.Router();

// 上传头像
router.post(
    '/upload/avatar',
    authenticate,
    upload.single('avatar'),
    fileController.uploadAvatar
);

// 上传内容文件
router.post(
    '/upload/content',
    authenticate,
    upload.single('contentFile'),
    fileController.uploadContent
);

router.get('/uploaded/avatar/:id', authenticate, fileController.getAvatar);
router.get(
    '/uploaded/content/:contentId',
    authenticate,
    fileController.getContentMedia
);
router.get('/upload/public/content/:contentId', fileController.getContentMedia);

module.exports = router;
