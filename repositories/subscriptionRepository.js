// repositories/subscriptionRepository.js
const Subscription = require('../models/Subscription');
const Op = require('sequelize').Op;


class SubscriptionRepository {
    async createSubscription(data) {
        return await Subscription.create(data);
    }

    async getSubscriptionById(id) {
        return await Subscription.findByPk(id);
    }

    async getUserActiveSubscription(userId, creatorId) {
        return await Subscription.findOne({
            where: {
                user_id: userId,
                creator_id: creatorId,
                status: 'active',
            },
        });
    }

    async updateSubscriptionStatus(id, status) {
        await Subscription.update({ status }, { where: { id } });
        return await this.getSubscriptionById(id);
    }

    // 检查订阅是否过期，更新状态
    async checkAndExpireSubscriptions() {;
    }

    async findAllExpiredSubscriptions(nowTime) {
        return await Subscription.findAll({
            where: {
                status: 'active',
                end_date: {
                    [Op.lt]: nowTime,
                },
            },
        });
    }

    // 获取用户与创作者的订阅，不论状态
    async getUserSubscription(userId, creatorId) {
        return await Subscription.findOne({
            where: {
                user_id: userId,
                creator_id: creatorId,
            },
        });
    }

    // 更新订阅的结束日期和状态
    async renewSubscription(id, endDate) {
        return await Subscription.update(
            { end_date: endDate, status: 'active' },
            { where: { id } }
        );
    }
}

module.exports = new SubscriptionRepository();
