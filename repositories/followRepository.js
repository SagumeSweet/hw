const Follow = require('../models/Follow');

class FollowRepository {
    async createFollow(data) {
        return await Follow.create(data);
    }

    async removeFollow(userId, creatorId) {
        return await Follow.destroy({
            where: {
                user_id: userId,
                creator_id: creatorId,
            },
        });
    }

    async getFollowing(userId) {
        console.log(userId);
        return await Follow.findAll({ where: { user_id: userId } });
    }

    // 检查是否已存在相同的关注关系
    async getExistingFollow(userId, creatorId) {
        return await Follow.findOne({
            where: {
                user_id: userId,
                creator_id: creatorId,
            },
        });
    }
}

module.exports = new FollowRepository();
