const paymentAccountRepository = require('../repositories/paymentAccountRepository');

class PaymentAccountService {
    async createPaymentAccount(userId, accountName, accountInfo) {
        const paymentAccountData = {
            user_id: userId,
            account_name: accountName,
            account_info: accountInfo,
        };

        if (
            (await paymentAccountRepository.getPaymentAccountsByUserId(userId))
                .length === 0
        ) {
            paymentAccountData.isDefault = true;
        } else {
            paymentAccountData.isDefault = false;
        }
        const newAccount = await paymentAccountRepository.createPaymentAccount(
            paymentAccountData
        );

        const dto = this.formatPaymentAccountData(newAccount);
        return dto;
    }

    async getPaymentAccountById(id) {
        const account = await paymentAccountRepository.getPaymentAccountById(
            id
        );

        const dto = this.formatPaymentAccountData(account);
        return dto;
    }

    async getDefaultPaymentAccountByUserId(userId) {
        const accounts =
            await paymentAccountRepository.getDefaultPaymentAccountsByUserId(
                userId
            );
        if (accounts.length !== 1) {
            throw new Error('内部错误，多个默认账号或无默认账号');
        }
        return accounts.map(this.formatPaymentAccountData);
    }

    async getUserPaymentAccounts(userId) {
        const accounts =
            await paymentAccountRepository.getPaymentAccountsByUserId(userId);
        const dto = accounts.map(this.formatPaymentAccountData);
        return dto;
    }

    async deletePaymentAccount(userId, id) {
        const account = await paymentAccountRepository.getPaymentAccountById(
            id
        );
        if (!account) {
            throw new Error('账户不存在');
        } else if (account.user_id !== userId) {
            throw new Error('无权操作');
        }

        return await paymentAccountRepository.deletePaymentAccount(id);
    }

    async updateDefaultAccount(id, userId) {
        const newDefault = await paymentAccountRepository.getPaymentAccountById(
            id
        );
        if (newDefault.user_id !== userId) {
            throw new Error('非法操作');
        }
        const oldDefault = await this.getDefaultPaymentAccountByUserId(userId);
        console.log(oldDefault[0].id)
        console.log(id)
        if ( oldDefault[0].id === id) {
            throw new Error('该账号已为默认账号');
        } else {
            await paymentAccountRepository.updatePaymentAccount(
                oldDefault[0].id,
                {
                    isDefault: false,
                }
            );
        }
        await paymentAccountRepository.updatePaymentAccount(id, {
            isDefault: true,
        });
    }

    formatPaymentAccountData(account) {
        if (!account) {
            throw new Error('支付账号不存在');
        }
        return {
            id: account.id,
            accountName: account.account_name,
            accountInfo: account.account_info,
            isDefault: account.isDefault,
        };
    }
}

module.exports = new PaymentAccountService();
