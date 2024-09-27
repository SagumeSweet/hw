// controllers/transactionController.js
const transactionRecordService = require('../services/transactionRecordService');

class TransactionController {
    async getTransactionsRecordByUserId(req, res) {
        try {
            const userId = req.user.id;
            const transactionRecords =
                await transactionRecordService.getTransactionsRecordByUserId(
                    userId
                );
            return res.status(200).json(transactionRecords);
        } catch (error) {
            return res.status(404).json({ message: error.message });
        }
    }
}

module.exports = new TransactionController();
