const express = require('express');
const router = express.Router();
const followController = require('../controllers/followController');
const { authenticate } = require('../middlewares/authMiddleware');

router.post('/follow', authenticate, followController.follow);
router.delete('/follow', authenticate, followController.unFollow);
router.get('/follow', authenticate, followController.getFollowing);

module.exports = router;
