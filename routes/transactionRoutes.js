const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/TransactionController');
const { authenticate } = require('../middlewares/authMiddleware');

router.post('/transaction/pay', authenticate, transactionController.pay);

module.exports = router;
