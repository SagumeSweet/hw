// routes/subscriptionRoutes.js
const express = require('express');
const router = express.Router();
const subscriptionController = require('../controllers/subscriptionController');
const { authenticate } = require('../middlewares/authMiddleware');

// 订阅创作者
router.post('/subscribe', authenticate, subscriptionController.subscribe);

// 获取用户的订阅列表
router.get(
    '/user/subscriptions',
    authenticate,
    subscriptionController.getUserSubscriptions
);



module.exports = router;
