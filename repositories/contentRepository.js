// repositories/contentRepository.js

const Content = require('../models/Content');
const User = require('../models/User');

class ContentRepository {
    // 创建内容
    async createContent(data) {
        const newContent = await Content.create(data);
        return await this.getContentById(newContent.id);
    }

    // 根据 ID 获取内容（单条查询）
    async getContentById(id) {
        return await Content.findByPk(id, {
            include: [
                {
                    model: User,
                    as: 'creator',
                    attributes: ['id', 'username'],
                },
            ],
        });
    }

    // 根据title获取内容
    async getContentByTitle(title) {
        return await Content.findOne({
            attributes: ['id'],
            where: { title: title },
        });
    }

    // 根据 ID 获取内容（公开）
    async getPublicContentById(id) {
        return await Content.findOne({
            where: {
                id: id,
                content_type: 'public',
            },
            include: [
                {
                    model: User,
                    as: 'creator',
                    attributes: ['id', 'username'],
                },
            ],
        });
    }

    // 获取所有公开内容（支持分页）
    async getPublicContents(offset = 0, limit = 10) {
        return await Content.findAndCountAll({
            attributes: ['id', 'title', 'content_type'], // 只返回 id、title 和 content_type
            where: {
                content_type: 'public',
            },
            include: [
                {
                    model: User,
                    as: 'creator',
                    attributes: ['id', 'username'], // 只返回 id 和 username
                },
            ],
            offset,
            limit,
            order: [['createdAt', 'DESC']],
        });
    }

    // 获取所有订阅内容（支持分页）
    async getSubscriberContents(offset = 0, limit = 10) {
        return await Content.findAndCountAll({
            attributes: ['id', 'title', 'content_type'], // 只返回 id、title 和 content_type
            where: {
                content_type: 'subscriber',
            },
            include: [
                {
                    model: User,
                    as: 'creator',
                    attributes: ['id', 'username'],
                },
            ],
            offset,
            limit,
            order: [['createdAt', 'DESC']],
        });
    }

    // 获取创作者的所有内容（支持分页）
    async getContentsByCreatorId(creatorId, offset = 0, limit = 10) {
        return await Content.findAndCountAll({
            attributes: ['id', 'title', 'content_type'],
            where: { creator_id: creatorId },
            include: [
                {
                    model: User,
                    as: 'creator',
                    attributes: ['id', 'username'],
                },
            ],
            offset,
            limit,
            order: [['createdAt', 'DESC']],
        });
    }

    // 获取创作者的订阅内容（支持分页）
    async getSubscriberContentsByCreatorId(creatorId, offset = 0, limit = 10) {
        return await Content.findAndCountAll({
            attributes: ['id', 'title', 'content_type'],
            where: {
                creator_id: creatorId,
                content_type: 'subscriber',
            },
            include: [
                {
                    model: User,
                    as: 'creator',
                    attributes: ['id', 'username'],
                },
            ],
            offset,
            limit,
            order: [['createdAt', 'DESC']],
        });
    }

    // 获取所有内容，支持分页
    async getAllContentsWithPagination(offset = 0, limit = 10) {
        return await Content.findAndCountAll({
            attributes: ['id', 'title', 'content_type'],
            include: [
                {
                    model: User,
                    as: 'creator',
                    attributes: ['id', 'username'],
                },
            ],
            offset,
            limit,
            order: [['createdAt', 'DESC']],
        });
    }
}

module.exports = new ContentRepository();
