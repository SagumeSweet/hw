// services/paymentOrderService.js
const paymentOrderRepository = require('../repositories/paymentOrderRepository');

const paymentAccountService = require('./paymentAccountService');
const userService = require('./userService');

class PaymentOrderService {
    async createPaymentOrder(userId, creatorId, paymentAccountId, amount) {
        const account = await paymentAccountService.getPaymentAccountById(
            paymentAccountId
        );
        if (!account) {
            throw new Error('支付账户无效');
        }
        const orderData = {
            user_id: userId,
            creator_id: creatorId,
            payment_account_id: account.id,
            amount,
            status: 'pending',
        };
        const newOrder = await paymentOrderRepository.createPaymentOrder(
            orderData
        );

        return this.formatPaymentOrderData(newOrder);
    }

    async getPaymentOrdersById(id) {
        const order = await paymentOrderRepository.getOrderById(id);
        return this.formatPaymentOrderData(order);
    }

    async getPendingOrdersByUserId(userId) {
        const orders = await paymentOrderRepository.getPendingOrdersByUserId(
            userId
        );
        return orders.map(this.formatPaymentOrderData);
    }

    async updatePaymentOrder(orderId, status) {
        const order = await paymentOrderRepository.getOrderById(orderId);
        if (!order) {
            throw new Error('订单无效');
        } else if (order.status === 'failed') {
            throw new Error('订单已取消');
        } else if (order.status === 'completed') {
            throw new Error('订单已完成');
        }
        order.status = status;
        const result = await paymentOrderRepository.updateOrder(orderId, {
            status,
        });
        return result;
    }

    formatPaymentOrderData(order) {
        return {
            userId: order.user_id,
            creatorId: order.creator_id,
            paymentAccountId: order.payment_account_id,
            amount: order.amount,
            status: order.status,
        };
    }
}

module.exports = new PaymentOrderService();
