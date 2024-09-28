// controllers/contentController.js

const contentService = require('../services/contentService');

class ContentController {
    // 创建内容
    async createContent(req, res) {
        try {
            const creatorId = req.user.id; // 需要登录，获取创作者的用户 ID
            const contentData = req.body;
            // 文件上传后的 URL 和类型
            if (req.file) {
                contentData.media_url = req.file.path; // 文件存储路径
                contentData.media_type = req.file.mimetype.startsWith('image')
                    ? 'image'
                    : 'video';
            }

            const content = await contentService.createContent(
                creatorId,
                contentData
            );

            res.status(201).json(content);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    // 不登录获取内容
    async getPublicContent(req, res) {
        try {
            const { contentId } = req.params;

            const content = await contentService.getPublicContent(contentId);

            res.status(200).json(content);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async getContent(req, res) {
        try {
            const userId = req.user.id;
            const { contentId } = req.params;

            const content = await contentService.getContent(userId, contentId);

            res.status(200).json(content);
        } catch (error) {
            if (error.message === '您需要订阅才能查看此内容') {
                res.status(403).json({ message: error.message });
            } else {
                res.status(400).json({ message: error.message });
            }
        }
    }

    async getSelfContents(req, res) {
        try {
            const creatorId = req.user.id;
            const page = parseInt(req.query.page, 10) || 1;
            const pageSize = parseInt(req.query.pageSize, 10) || 10;

            const data = await contentService.getContentsByCreatorId(
                creatorId,
                page,
                pageSize
            );

            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    // 获取创作者的所有内容
    async getContentsByUserId(req, res) {
        try {
            const creatorId = parseInt(req.params.userId, 10);
            const page = parseInt(req.query.page, 10) || 1;
            const pageSize = parseInt(req.query.pageSize, 10) || 10;

            const data = await contentService.getContentsByCreatorId(
                creatorId,
                page,
                pageSize
            );

            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    // 获取创作者的订阅内容
    async getSubscriberContentsByUserId(req, res) {
        try {
            const creatorId = parseInt(req.params.userId, 10);
            const page = parseInt(req.query.page, 10) || 1;
            const pageSize = parseInt(req.query.pageSize, 10) || 10;

            const data = await contentService.getSubscriberContentsByCreatorId(
                creatorId,
                page,
                pageSize
            );

            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    // 获取所有公开内容
    async getPublicContents(req, res) {
        try {
            const page = parseInt(req.query.page, 10) || 1;
            const pageSize = parseInt(req.query.pageSize, 10) || 10;

            const data = await contentService.getPublicContents(page, pageSize);

            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    // 获取所有内容
    async getAllContents(req, res) {
        try {
            const page = parseInt(req.query.page, 10) || 1;
            const pageSize = parseInt(req.query.pageSize, 10) || 10;

            const data = await contentService.getAllContents(page, pageSize);

            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    // 获取所有订阅内容
    async getSubscriberContents(req, res) {
        try {
            const page = parseInt(req.query.page, 10) || 1;
            const pageSize = parseInt(req.query.pageSize, 10) || 10;

            const data = await contentService.getSubscriberContents(
                page,
                pageSize
            );

            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new ContentController();
