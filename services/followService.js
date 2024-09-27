const followRepository = require('../repositories/followRepository');

class FollowService {
    async followUser(userId, creatorId) {
        // 检查用户是否关注自己
        if (userId === creatorId) {
            throw new Error('不能关注自己');
        }

        // 检查是否已存在相同的关注关系
        const existingFollow = await followRepository.getExistingFollow(
            userId,
            creatorId
        );
        if (existingFollow) {
            throw new Error('已经关注此用户');
        }

        const newFollow = {
            user_id: userId,
            creator_id: creatorId,
        };

        const follow = await followRepository.createFollow(newFollow);
        return this.formatFollowData(follow); // 返回格式化后的数据
    }

    async unFollowUser(userId, creatorId) {
        const result = await followRepository.removeFollow(userId, creatorId);

        return result; 
    }

    async getUserFollowing(userId) {
        const follows = await followRepository.getFollowing(userId);
        return follows.map(this.formatFollowData);
    }

    // 格式化关注数据
    formatFollowData(follow) {
        return {
            userId: follow.user_id,
            creatorId: follow.creator_id,
            createdAt: follow.createdAt,
        };
    }
}

module.exports = new FollowService();
