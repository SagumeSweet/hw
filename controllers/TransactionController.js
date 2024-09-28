const transactionService = require('../services/transactionService');

class TransactionController {
    async pay(req, res) {
        try {
            const { id } = req.body;
            await transactionService.pay(id, req.user.id);
            return res.status(200).json({ message: '支付成功' });
        } catch (error) {
            return res.status(400).json({ message: `支付时${error.message}` });
        }
    }
}

module.exports = new TransactionController();
