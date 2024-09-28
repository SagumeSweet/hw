const paymentAccountService = require('./paymentAccountService');
const paymentOrderService = require('./paymentOrderService');
const transactionRecordService = require('./transactionRecordService');
const subscriptionService = require('./subscriptionService');

class TransactionService {
    async pay(orderId, userId) {
        const oldOrderData = await paymentOrderService.getPaymentOrdersById(
            orderId
        );
        if (oldOrderData.userId !== userId) {
            throw new Error('非法操作');
        }
        const incomeAccount =
            await paymentAccountService.getDefaultPaymentAccountByUserId(
                oldOrderData.creatorId
            );
        const expenseAccount =
            await paymentAccountService.getPaymentAccountById(
                oldOrderData.paymentAccountId
            );
        const is_success = this.payApi(incomeAccount, expenseAccount);
        if (is_success) {
            const newOrderData = await paymentOrderService.updatePaymentOrder(
                orderId,
                'completed'
            );
            await transactionRecordService.createTransactionRecord(orderId);
            // 创建订阅
            await subscriptionService.createSubscriptionAfterPayment(
                newOrderData.userId,
                newOrderData.creatorId,
                newOrderData.month
            );
        } else {
            await paymentOrderService.updatePaymentOrder(orderId, 'failed');
            throw new Error('支付失败');
        }
        return { message: '支付成功' };
    }

    payApi(incomeAccount, expenseAccount) {
        return true;
    }
}

module.exports = new TransactionService();
