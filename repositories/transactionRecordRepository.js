// repositories/transactionRepository.js
const TransactionRecord = require('../models/TransactionRecord');

class TransactionRecordRepository {
    async createTransactionRecord(data) {
        return await TransactionRecord.create(data);
    }

    async getTransactionsRecordByUserId(userId) {
        return await TransactionRecord.findAll({ where: { user_id: userId } });
    }
}

module.exports = new TransactionRecordRepository();
