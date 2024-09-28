// services/contentService.js

const contentRepository = require('../repositories/contentRepository');
const subscriptionService = require('./subscriptionService');
const userService = require('./userService');

class ContentService {
    // 创建内容
    async createContent(creatorId, contentData) {
        const creator = await userService.getUserById(creatorId);
        if (creator.role !== 'creator') {
            throw new Error('非创作者');
        }
        if (await contentRepository.getContentByTitle(contentData.title)) {
            throw new Error('标题已存在');
        }

        const newContentData = {
            creator_id: creatorId,
            title: contentData.title,
            body: contentData.body,
            content_type: contentData.contentType,
            media_url: contentData.media_url,
            media_type: contentData.media_type,
        };
        const newContent = await contentRepository.createContent(
            newContentData
        );
        return this.mappingContent(newContent);
    }

    // 获取内容并检查访问权限
    async getContent(userId, contentId) {
        const content = await contentRepository.getContentById(contentId);
        if (!content) {
            throw new Error('内容未找到');
        }

        if (content.content_type === 'public') {
            return this.mappingContent(content);
        } else if (content.content_type === 'subscriber') {
            // 订阅内容，检查用户是否订阅了该创作者
            const isSubscribed =
                await subscriptionService.hasActiveSubscription(
                    userId,
                    content.creator_id
                );
            if (isSubscribed || userId === content.creator_id) {
                return this.mappingContent(content);
            }
            const dto = this.mappingBasic(content);
            dto.message = '您需要订阅才能查看此内容';
            return dto;
        } else {
            return;
        }
    }

    async getPublicContent(contentId) {
        const content = await contentRepository.getPublicContentById(contentId);
        if (!content) {
            throw new Error('内容未找到');
        } else {
            return this.mappingContent(content);
        }
    }

    // 获取所有内容
    async getAllContents(page = 1, pageSize = 10) {
        const offset = (page - 1) * pageSize;
        const limit = pageSize;

        const result = await contentRepository.getAllContentsWithPagination(
            offset,
            limit
        );

        return {
            contents: result.rows.map(this.mappingBasic),
            total: result.count,
            page,
            pageSize,
            totalPages: Math.ceil(result.count / pageSize),
        };
    }

    // 获取所有公开内容
    async getPublicContents(page = 1, pageSize = 10) {
        const offset = (page - 1) * pageSize;
        const limit = pageSize;

        const result = await contentRepository.getPublicContents(offset, limit);

        return {
            contents: result.rows.map(this.mappingBasic),
            total: result.count,
            page,
            pageSize,
            totalPages: Math.ceil(result.count / pageSize),
        };
    }

    // 获取所有订阅内容
    async getSubscriberContents(page = 1, pageSize = 10) {
        const offset = (page - 1) * pageSize;
        const limit = pageSize;

        const result = await contentRepository.getSubscriberContents(
            offset,
            limit
        );

        return {
            contents: result.rows.map(this.mappingBasic),
            total: result.count,
            page,
            pageSize,
            totalPages: Math.ceil(result.count / pageSize),
        };
    }

    // 获取创作者的所有内容
    async getContentsByCreatorId(creatorId, page = 1, pageSize = 10) {
        const offset = (page - 1) * pageSize;
        const limit = pageSize;

        const result = await contentRepository.getContentsByCreatorId(
            creatorId,
            offset,
            limit
        );

        return {
            contents: result.rows.map(this.mappingBasic),
            total: result.count,
            page,
            pageSize,
            totalPages: Math.ceil(result.count / pageSize),
        };
    }

    // 获取创作者的订阅内容
    async getSubscriberContentsByCreatorId(creatorId, page = 1, pageSize = 10) {
        const offset = (page - 1) * pageSize;
        const limit = pageSize;

        const result = await contentRepository.getSubscriberContentsByCreatorId(
            creatorId,
            offset,
            limit
        );

        return {
            contents: result.rows.map(this.mappingBasic),
            total: result.count,
            page,
            pageSize,
            totalPages: Math.ceil(result.count / pageSize),
        };
    }

    mappingBasic(content) {
        if (!content) {
            throw new Error('内容未找到');
        }

        return {
            id: content.id,
            title: content.title,
            content_type: content.content_type,
            creator: {
                id: content.creator.id,
                username: content.creator.username,
            },
        };
    }

    mappingContent(content) {
        return {
            id: content.id,
            title: content.title,
            body: content.body,
            content_type: content.content_type,
            media_url: content.media_url,
            media_type: content.media_type,
            creator: {
                id: content.creator.id,
                username: content.creator.username,
            },
        };
    }
}

module.exports = new ContentService();
