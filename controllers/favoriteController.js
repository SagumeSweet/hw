// controllers/favoriteController.js

const favoriteService = require('../services/favoriteService');

class FavoriteController {
    // 添加收藏
    async addFavorite(req, res) {
        try {
            const userId = req.user.id;
            const { contentId } = req.body;

            const favorite = await favoriteService.addFavorite(
                userId,
                contentId
            );
            res.status(201).json(favorite);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    // 取消收藏
    async removeFavorite(req, res) {
        try {
            const userId = req.user.id;
            const { contentId } = req.body;

            await favoriteService.removeFavorite(userId, contentId);
            res.status(200).json({ message: '已取消收藏' });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    // 获取用户的收藏列表
    async getUserFavorites(req, res) {
        try {
            const userId = parseInt(req.user.id, 10);
            const page = parseInt(req.query.page, 10) || 1;
            const pageSize = parseInt(req.query.pageSize, 10) || 10;

            if (isNaN(userId)) {
                return res.status(400).json({ message: '无效的 userId' });
            }

            const data = await favoriteService.getUserFavorites(
                userId,
                page,
                pageSize
            );
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    // 获取收藏某内容的用户列表
    async getContentFavoritedByUsers(req, res) {
        try {
            const contentId = parseInt(req.params.contentId, 10);
            const page = parseInt(req.query.page, 10) || 1;
            const pageSize = parseInt(req.query.pageSize, 10) || 10;

            if (isNaN(contentId)) {
                return res.status(400).json({ message: '无效的 contentId' });
            }

            const data = await favoriteService.getContentFavoritedByUsers(
                contentId,
                page,
                pageSize
            );
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new FavoriteController();
