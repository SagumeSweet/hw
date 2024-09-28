// controllers/paymentOrderController.js
const paymentOrderService = require('../services/paymentOrderService');

class PaymentOrderController {
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
