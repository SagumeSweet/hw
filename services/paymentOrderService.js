// services/paymentOrderService.js
const paymentOrderRepository = require('../repositories/paymentOrderRepository');
const userService = require('./userService');
const paymentAccountService = require('./paymentAccountService');

class PaymentOrderService {
    async createPaymentOrder(
        userId,
        creatorId,
        paymentAccountId,
        month,
        description
    ) {
        const account = await paymentAccountService.getPaymentAccountById(
            paymentAccountId
        );
        if (!account) {
            throw new Error('支付账户无效');
        }
        const creator = await userService.getUserById(creatorId);
        if (creator.role !== 'creator') {
            throw new Error('对方非作者');
        }

        const orderData = {
            user_id: userId,
            creator_id: creatorId,
            payment_account_id: account.id,
            month: month,
            amount: creator.price * month,
            status: 'pending',
            description: description,
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
        const result = await paymentOrderRepository.updateOrder(orderId, {
            status,
        });
        return this.formatPaymentOrderData(result);
    }

    formatPaymentOrderData(order) {
        return {
            id: order.id,
            userId: order.user_id,
            creatorId: order.creator_id,
            paymentAccountId: order.payment_account_id,
            month: order.month,
            amount: order.amount,
            status: order.status,
            description: order.description,
            createdAt: order.createdAt,
            updatedAt: order.updatedAt,
        };
    }
}

module.exports = new PaymentOrderService();
