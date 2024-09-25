const express = require('express');
const { createContent, getAllContent } = require('../controllers/contentController');
const { authenticate } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authenticate, createContent);
router.get('/', getAllContent);

module.exports = router;
