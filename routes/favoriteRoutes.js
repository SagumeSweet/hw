// routes/favoriteRoutes.js

const express = require('express');
const router = express.Router();
const { authenticate } = require('../middlewares/authMiddleware');
const favoriteController = require('../controllers/favoriteController');


// // 获取收藏某内容的用户列表
// router.get(
//     '/contents/:contentId/favorited-by',
//     favoriteController.getContentFavoritedByUsers
// );

module.exports = router;
