const paymentAccountService = require('../services/paymentAccountService');

class PaymentAccountController {
    async create(req, res) {
        const { accountName, accountInfo } = req.body;
        const userId = req.user.id;
        try {
            const paymentAccount =
                await paymentAccountService.createPaymentAccount(
                    userId,
                    accountName,
                    accountInfo
                );
            return res.status(201).json(paymentAccount);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }

    async getUserAccounts(req, res) {
        const userId = req.user.id;
        try {
            const paymentAccounts =
                await paymentAccountService.getUserPaymentAccounts(userId);
            return res.status(200).json(paymentAccounts);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }

    async delete(req, res) {
        const { id } = req.params;
        const userId = req.user.id;
        try {
            await paymentAccountService.deletePaymentAccount(userId, id);
            return res.status(200).json({ message: '支付账号删除成功' });
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }

    async updateDefault(req, res) {
        const { id } = req.params;
        const userId = req.user.id;
        try {
            await paymentAccountService.updateDefaultAccount(Number(id), userId);
            return res.status(200).json({ message: '默认支付账号更新成功' });
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }
}

module.exports = new PaymentAccountController();
