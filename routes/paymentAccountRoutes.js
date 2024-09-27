const express = require('express');
const router = express.Router();
const paymentAccountController = require('../controllers/paymentAccountController');
const { authenticate } = require('../middlewares/authMiddleware');

router.post('/payment-accounts', authenticate, paymentAccountController.create);
router.get(
    '/payment-accounts',
    authenticate,
    paymentAccountController.getUserAccounts
);
router.delete(
    '/payment-accounts/:id',
    authenticate,
    paymentAccountController.delete
);

module.exports = router;
