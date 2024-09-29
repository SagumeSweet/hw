const express = require('express');
const router = express.Router();
const orderController = require('../controllers/paymentOrderController');
const { authenticate } = require('../middlewares/authMiddleware');

router.get(
    '/user/payment-orders',
    authenticate,
    orderController.getPendingOrdersByUserId
);

module.exports = router;
