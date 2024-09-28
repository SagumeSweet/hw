// services/favoriteService.js

const favoriteRepository = require('../repositories/favoriteRepository');


class FavoriteService {
    // 添加收藏
    async addFavorite(userId, contentId) {
        // 检查是否已收藏
        const alreadyFavorited = await favoriteRepository.isFavorite(
            userId,
            contentId
        );
        if (alreadyFavorited) {
            throw new Error('您已收藏该内容');
        }
        return this.mapping(await favoriteRepository.addFavorite(userId, contentId));
    }

    // 取消收藏
    async removeFavorite(userId, contentId) {
        // 检查是否已收藏
        const alreadyFavorited = await favoriteRepository.isFavorite(
            userId,
            contentId
        );
        if (!alreadyFavorited) {
            throw new Error('您尚未收藏该内容');
        }
        return await favoriteRepository.removeFavorite(userId, contentId);
    }

    // 获取用户的收藏列表
    async getUserFavorites(userId, page = 1, pageSize = 10) {
        const offset = (page - 1) * pageSize;
        const result = await favoriteRepository.getUserFavorites(
            userId,
            offset,
            pageSize
        );
        return {
            contentIds: result.contentIds,
            total: result.total,
            page,
            pageSize,
            totalPages: Math.ceil(result.total / pageSize),
        };
    }

    // 获取收藏某内容的用户列表
    async getContentFavoritedByUsers(contentId, page = 1, pageSize = 10) {
        const offset = (page - 1) * pageSize;
        const result = await favoriteRepository.getContentFavoritedByUsers(
            contentId,
            offset,
            pageSize
        );
        return {
            userIds: result.userIds,
            total: result.total,
            page,
            pageSize,
            totalPages: Math.ceil(result.total / pageSize),
        };
    }

    mapping(favorite) {
        return {
            id: favorite.id,
            userId: favorite.user_id,
            contentId: favorite.content_id,
        };
    }
}

module.exports = new FavoriteService();
