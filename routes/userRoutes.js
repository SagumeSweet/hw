const express = require('express');
const userController = require('../controllers/userController');
const { authenticate } = require('../middlewares/authMiddleware');
const favoriteController = require('../controllers/favoriteController');
const contentController = require('../controllers/contentController');

const router = express.Router();

router.post('/user/register', userController.register);
router.post('/user/login', userController.login);
router.get('/user/me', authenticate, userController.getSelfInfo);
router.put('/user/me', authenticate, userController.updateUser);
router.put('/user/me/role', authenticate, userController.updateUserRole);
router.get('/user/user/:id', userController.getUserByIdFromPublic);



// 获取创作者的所有内容
router.get('/user/user/:userId/contents', contentController.getContentsByUserId);

// 获取创作者的订阅内容
router.get(
    '/user/user/:userId/subscriber-contents',
    contentController.getSubscriberContentsByUserId
);

router.get('/user/contents', authenticate, contentController.getSelfContents);

// 添加收藏（需要登录）
router.post('/user/favorites', authenticate, favoriteController.addFavorite);

// 取消收藏（需要登录）
router.delete(
    '/user/favorites',
    authenticate,
    favoriteController.removeFavorite
);

// 获取用户的收藏列表
router.get(
    '/user/favorites',
    authenticate,
    favoriteController.getUserFavorites
);



module.exports = router;
