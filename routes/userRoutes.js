const express = require('express');
const userController = require('../controllers/userController');
const { authenticate } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/me', authenticate, userController.getUserInfo);
router.put('/me', authenticate, userController.updateUser);

module.exports = router;
