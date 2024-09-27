const PaymentAccount = require('../models/PaymentAccount');

class PaymentAccountRepository {
    async createPaymentAccount(data) {
        try {
            return await PaymentAccount.create(data);
        } catch (error) {
            throw new Error(`Payment Account Database: ${error.message}`);
        }
    }

    async getPaymentAccountsByUserId(userId) {
        return await PaymentAccount.findAll({ where: { user_id: userId } });
    }

    async getDefaultPaymentAccountsByUserId(userId) {
        return await PaymentAccount.findAll({
            where: { user_id: userId, is_default: true },
        });
    }

    async getPaymentAccountById(id) {
        return await PaymentAccount.findByPk(id);
    }

    async deletePaymentAccount(id) {
        return await PaymentAccount.destroy({ where: { id } });
    }

    async updatePaymentAccount(id, data) {
        return await PaymentAccount.update(data, { where: { id } });
    }
}

module.exports = new PaymentAccountRepository();
