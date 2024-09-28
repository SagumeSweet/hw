// controllers/subscriptionController.js
const subscriptionService = require('../services/subscriptionService');

class SubscriptionController {
    async subscribe(req, res) {
        try {
            const userId = req.user.id;
            const { creatorId, month, paymentAccountId } = req.body;

            const order = await subscriptionService.initiateSubscription(
                userId,
                creatorId,
                paymentAccountId,
                month
            );

            res.status(201).json({
                order
            });
        } catch (error) {
            res.status(400).json({
                message: error.message,
            });
        }
    }

    async getUserSubscriptions(req, res) {
        try {
            const userId = req.user.id;

            const subscriptions =
                await subscriptionService.getSubscriptionByUserId(userId);

            res.status(200).json({
                subscriptions,
            });
        } catch (error) {
            res.status(400).json({
                code: 400,
                message: error.message,
            });
        }
    }


}

module.exports = new SubscriptionController();
