const express = require('express');
const router = express.Router();
const transactionRecordController = require('../controllers/transactionRecordController');
const { authenticate } = require('../middlewares/authMiddleware');

router.get(
    '/user/transaction-record',
    authenticate,
    transactionRecordController.getTransactionsRecordByUserId
);

module.exports = router;
