// services/subscriptionService.js
const { or } = require('sequelize');
const subscriptionRepository = require('../repositories/subscriptionRepository');
const paymentOrderService = require('./paymentOrderService');
const userService = require('./userService');

class SubscriptionService {
    // 用户发起订阅请求，生成订单
    async initiateSubscription(userId, creatorId, paymentAccountId, month) {
        if (!userId || !creatorId || !paymentAccountId || !month) {
            throw new Error('SubscriptionService.initiateSubscription参数错误');
        }
        if (userId === creatorId) {
            throw new Error('不能订阅自己');
        }
        // 检查订阅是否过期，更新状态)
        await this.checkAndExpireSubscriptions();
        // 检查是否已存在活跃的订阅
        const existingSubscription =
            await subscriptionRepository.getUserActiveSubscription(
                userId,
                creatorId
            );
        if (existingSubscription) {
            throw new Error('您已经订阅了该创作者');
        }

        // 计算订单金额
        const creator = await userService.getUserById(creatorId);
        const price = creator.price;

        // 创建支付订单
        const order = await paymentOrderService.createPaymentOrder(
            userId,
            creatorId,
            paymentAccountId,
            month,
            `订阅创作者 ${creatorId}，时长 ${month} 个月`
        );

        return {
            orderId: order.id,
            creatorId: order.creatorId,
            paymentAccountId: order.paymentAccountId,
            month: order.month,
            totalAmount: order.amount,
            status: order.status,
            createdAt: order.createdAt,
        };
    }

    // 支付成功后创建订阅
    async createSubscriptionAfterPayment(userId, creatorId, month) {
        const startDate = new Date();
        const endDate = new Date();
        endDate.setMonth(startDate.getMonth() + month);

        const subscriptionData = {
            user_id: userId,
            creator_id: creatorId,
            start_date: startDate,
            end_date: endDate,
            status: 'active',
        };

        return await subscriptionRepository.createSubscription(
            subscriptionData
        );
    }

    // 检查订阅是否过期，更新状态
    async checkAndExpireSubscriptions() {
        const now = new Date();
        const expiredSubscriptions =
            await subscriptionRepository.findAllExpiredSubscriptions(now);

        for (const subscription of expiredSubscriptions) {
            await subscriptionRepository.updateSubscriptionStatus(
                subscription.id,
                'expired'
            );
        }
    }

    // 检查用户是否订阅了创作者
    async hasActiveSubscription(userId, creatorId) {
        await this.checkAndExpireSubscriptions();
        const subscription =
            await subscriptionRepository.getUserActiveSubscription(
                userId,
                creatorId
            );
        return !!subscription;
    }

    async getSubscriptionByUserId(userId) {
        const subscriptions = await subscriptionRepository.getUserSubscription(
            userId
        );
        return subscriptions.map(this.mapping);
    }

    mapping(subscription) {
        return {
            userId: subscription.user_id,
            creatorId: subscription.creator_id,
            startDate: subscription.start_date,
            endDate: subscription.end_date,
            status: subscription.status,
        };
    }
}

module.exports = new SubscriptionService();
