// routes/contentRoutes.js

const express = require('express');
const router = express.Router();
const contentController = require('../controllers/contentController');
const { authenticate } = require('../middlewares/authMiddleware');
const uploadMiddleware = require('../middlewares/uploadMiddleware');

// 创建内容（需要登录和上传文件）
router.post(
    '/content',
    authenticate,
    uploadMiddleware.single('media'),
    contentController.createContent
);

// 获取内容（登录）
router.get(
    '/content/:contentId',
    authenticate,
    contentController.getContent
);

// 获取内容（不登录）
router.get(
    '/content/public/:contentId',
    contentController.getPublicContent
);

// 获取所有公开内容
router.get('/public-contents', contentController.getPublicContents);

// 获取所有订阅内容
router.get(
    '/subscriber-contents',
    authenticate,
    contentController.getSubscriberContents
);

// 获取所有内容
router.get('/contents', contentController.getAllContents);


module.exports = router;
