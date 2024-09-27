const express = require('express');
const router = express.Router();
const orderController = require('../controllers/paymentOrderController');
const { authenticate } = require('../middlewares/authMiddleware');

router.post(
    '/payment-orders',
    authenticate,
    orderController.createPaymentOrder
);
router.get(
    '/payment-orders',
    authenticate,
    orderController.getPendingOrdersByUserId
);

module.exports = router;
