// repositories/paymentOrderRepository.js
const PaymentOrder = require('../models/PaymentOrder');

class PaymentOrderRepository {
    async createPaymentOrder(data) {
        return await PaymentOrder.create(data);
    }

    async getOrderById(id) {
        return await PaymentOrder.findByPk(id);
    }

    async getPendingOrdersByUserId(userId) {
        return await PaymentOrder.findAll({
            where: { user_id: userId, status: 'pending' },
        });
    }

    async updateOrder(id, data) {
        await PaymentOrder.update(data, { where: { id } });
        return await this.getOrderById(id);
    }
}

module.exports = new PaymentOrderRepository();
