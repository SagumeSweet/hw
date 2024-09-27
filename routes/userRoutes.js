const express = require('express');
const userController = require('../controllers/userController');
const { authenticate } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/user/register', userController.register);
router.post('/user/login', userController.login);
router.get('/user/me', authenticate, userController.getSelfInfo);
router.put('/user/me', authenticate, userController.updateUser)
router.get('/user/:id', userController.getUserById)

module.exports = router;
