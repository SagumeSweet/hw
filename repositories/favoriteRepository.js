// repositories/favoriteRepository.js

const Favorite = require('../models/Favorite');

class FavoriteRepository {
    // 添加收藏
    async addFavorite(userId, contentId) {
        return await Favorite.create({
            user_id: userId,
            content_id: contentId,
        });
    }

    // 取消收藏
    async removeFavorite(userId, contentId) {
        return await Favorite.destroy({
            where: {
                user_id: userId,
                content_id: contentId,
            },
        });
    }

    // 检查是否已收藏
    async isFavorite(userId, contentId) {
        const favorite = await Favorite.findOne({
            where: {
                user_id: userId,
                content_id: contentId,
            },
        });
        return !!favorite;
    }

    // 获取用户的收藏列表，支持分页，只返回 content_id
    async getUserFavorites(userId, offset = 0, limit = 10) {
        const { count, rows } = await Favorite.findAndCountAll({
            where: {
                user_id: userId,
            },
            attributes: ['content_id'], // 只返回 content_id
            offset,
            limit,
        });
        return {
            total: count,
            contentIds: rows.map((row) => row.content_id),
        };
    }

    // 获取收藏某内容的用户列表，支持分页，只返回 user_id
    async getContentFavoritedByUsers(contentId, offset = 0, limit = 10) {
        const { count, rows } = await Favorite.findAndCountAll({
            where: {
                content_id: contentId,
            },
            attributes: ['user_id'], // 只返回 user_id
            offset,
            limit,
        });
        return {
            total: count,
            userIds: rows.map((row) => row.user_id),
        };
    }
}

module.exports = new FavoriteRepository();
