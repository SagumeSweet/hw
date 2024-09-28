// services/transactionService.js
const transactionRecordRepository = require('../repositories/transactionRecordRepository');
const paymentOrderService = require('./paymentOrderService');

class TransactionRecordService {
    async createTransactionRecord(orderId) {
        const orderData = await paymentOrderService.getPaymentOrdersById(
            orderId
        );
        if (orderData.status === 'pending') {
            throw new Error('订单未结束');
        }

        const incomeData = {
            user_id: orderData.creatorId,
            type: 'income',
            amount: orderData.amount,
            description: orderData.description,
            createdAt: orderData.createdAt,
            closedAt: orderData.updatedAt,
        };
        const expense = {
            user_id: orderData.userId,
            type: 'expense',
            amount: orderData.amount,
            description: orderData.description,
            createdAt: orderData.createdAt,
            closedAt: orderData.updatedAt,
        };
        return {
            income: this.mapping(
                await transactionRecordRepository.createTransactionRecord(
                    incomeData
                )
            ),
            expense: this.mapping(
                await transactionRecordRepository.createTransactionRecord(
                    expense
                )
            ),
        };
    }

    async getTransactionsRecordByUserId(userId) {
        const transactionRecords =
            await transactionRecordRepository.getTransactionsRecordByUserId(
                userId
            );
        if (transactionRecords.length === 0) {
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
