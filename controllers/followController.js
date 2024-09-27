const followService = require('../services/followService');

class FollowController {
    async follow(req, res) {
        const { creatorId } = req.body;
        const followerId = req.user.id;

        try {
            await followService.followUser(followerId, creatorId);
            return res.status(201).json({ message: '关注成功' });
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }

    async unFollow(req, res) {
        const { creatorId } = req.body;
        const userId = req.user.id;

        try {
            await followService.unFollowUser(userId, creatorId);
            return res.status(200).json({ message: '取关成功' });
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }

    async getFollowing(req, res) {
        const userId = req.user.id;

        try {
            const follows = await followService.getUserFollowing(userId);
            return res.status(200).json({
                follows: follows,
                message: '获取关注列表成功'
            });
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }
}

module.exports = new FollowController();
