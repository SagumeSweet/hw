// controllers/paymentOrderController.js
const paymentOrderService = require('../services/paymentOrderService');

class PaymentOrderController {
    async createPaymentOrder(req, res) {
        try {
            const { creatorId, paymentAccountId, amount } = req.body;
            const order = await paymentOrderService.createPaymentOrder(
                req.user.id,
                creatorId,
                paymentAccountId,
                amount
            );
            return res.status(201).json({ order, message: '订单创建成功' });
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }

    async getPendingOrdersByUserId(req, res) {
        try {
            const orders = await paymentOrderService.getPendingOrdersByUserId(
                req.user.id
            );
            return res.status(200).json(orders);
        } catch (error) {
            return res.status(404).json({ message: error.message });
        }
    }
}

module.exports = new PaymentOrderController();
