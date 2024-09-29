const express = require('express');
const router = express.Router();
const paymentAccountController = require('../controllers/paymentAccountController');
const { authenticate } = require('../middlewares/authMiddleware');

router.post(
    '/user/payment-accounts',
    authenticate,
    paymentAccountController.create
);
router.get(
    '/user/payment-accounts',
    authenticate,
    paymentAccountController.getUserAccounts
);
router.delete(
    '/user/payment-accounts/:id',
    authenticate,
    paymentAccountController.delete
);

router.put(
    '/user/payment-accounts/:id',
    authenticate,
    paymentAccountController.updateDefault
);

module.exports = router;
