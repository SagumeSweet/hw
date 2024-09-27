// services/transactionService.js
const transactionRecordRepository = require('../repositories/transactionRecordRepository');

class TransactionRecordService {
    async createTransactionRecord(orderData) {
        if (orderData.status === 'pending') {
            throw new Error('订单未结束');
        }

        const incomeData = {
            user_id: orderData.userId,
            type: 'income',
            amount: orderData.amount,
            description: 'null',
        };
        const expense = {
            user_id: orderData.creatorId,
            type: 'expense',
            amount: orderData.amount,
            description: 'null',
        };

        await transactionRecordRepository.createTransaction(incomeData);
        await transactionRecordRepository.createTransaction(expense);
        return orderData.status === 'completed';
    }

    async getTransactionsRecordByUserId(userId) {
        const transactionRecords =
            await transactionRecordRepository.getTransactionsRecordByUserId(
                userId
            );
        if (!transactionRecords) {
            throw new Error('无记录');
        }
        return transactionRecords.map(this.mapping);
    }

    mapping(transactionRecord) {
        return {
            userId: transactionRecord.user_id,
            type: transactionRecord.type,
            amount: transactionRecord.amount,
            description: transactionRecord.description,
            createdAt: transactionRecord.createdAt,
        };
    }
}

module.exports = new TransactionRecordService();
