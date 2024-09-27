const paymentAccountService = require('./paymentAccountService');
const paymentOrderService = require('./paymentOrderService');
const transactionRecordService = require('./transactionRecordService');

class TransactionService {
    async pay(orderId) {
        const orderData = await paymentOrderService.getPaymentOrdersById(
            orderId
        );
        const incomeAccount =
            await paymentAccountService.getDefaultPaymentAccountByUserId(
                orderData.creatorId
            );
        const expenseAccount =
            await paymentAccountService.getPaymentAccountById(
                orderData.paymentAccountId
            );

        if (this.payApi(incomeAccount, expenseAccount)) {
            paymentOrderService.updatePaymentOrder(orderId, 'completed');
        } else {
            paymentOrderService.updatePaymentOrder(orderId, 'failed');
        }

        return await transactionRecordService.createTransactionRecord(
            orderData
        );
    }

    payApi(incomeAccount, expenseAccount) {
        return true;
    }
}

module.exports = new TransactionService();
