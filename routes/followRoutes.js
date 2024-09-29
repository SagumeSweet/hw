const express = require('express');
const router = express.Router();
const followController = require('../controllers/followController');
const { authenticate } = require('../middlewares/authMiddleware');

router.post('/user/follow', authenticate, followController.follow);
router.delete('/user/follow', authenticate, followController.unFollow);
router.get('/user/follow', authenticate, followController.getFollowing);

module.exports = router;
