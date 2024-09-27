const transactionService = require('./services/transactionService');

class TransactionController {
    async pay(req, res) {
        try {
            const { orderId } = req.params;
            await transactionService.pay(orderId);
            return res.status(200).json({ message: '支付成功' });
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }
}
