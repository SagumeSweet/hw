// services/fileService.js
const fileRepository = require('../repositories/fileRepository');
const contentService = require('./contentService');
const userService = require('./userService');

class FileService {
    // 上传头像
    async uploadAvatar(userId, file) {
        if (!userId) {
            throw new Error('未登录');
        }

        // 文件验证
        if (!this.isValidFile(file)) {
            throw new Error('无效的文件类型或大小');
        }

        // 保存头像路径
        await userService.updateUser(userId, { avatar: file });
        return;
    }

    // 上传内容文件
    async uploadContent(userId, file) {
        if (!userId) {
            throw new Error('未登录');
        }

        const user = await userService.getUserById(userId);
        if (user.role !== 'creator') {
            throw new Error('无权限上传内容');
        }

        // 文件验证
        const validTypes = {
            'image/jpeg': 'image',
            'image/png': 'image',
            'image/gif': 'image',
            'video/mp4': 'video',
            'video/mov': 'video',
            'video/avi': 'video',
        };

        const maxSize = 100 * 1024 * 1024; // 100MB
        if (file.size > maxSize) {
            throw new Error('文件大小超出限制');
        }

        // 保存内容文件
        const filePath = await fileRepository.saveFile(file);

        // 返回文件路径和类型
        return {
            filePath,
            fileType: validTypes[file.mimetype], // 文件类型
        };
    }

    // 发送头像
    async sendAvatar(userId) {
        const user = await userService.getUserById(userId);
        if (!user || !user.avatar) {
            throw new Error('头像未找到');
        }

        const filePath = user.avatar;
        return await fileRepository.getFile(filePath);
    }

    // 发送内容媒体
    async sendContentMedia(userId, contentId) {
        const content = await contentService.getContent(userId, contentId);
        if (!content) {
            throw new Error('内容未找到');
        }
        if (content.mediaUrl) {
            return await fileRepository.getFile(content.mediaUrl);
        }
        throw new Error('无权访问该内容');
    }

    // 文件验证方法
    isValidFile(file) {
        const allowedTypes = /jpeg|jpg|png|gif|mp4|mov|avi/;
        const maxSize = 100 * 1024 * 1024; // 100MB
        const extname = allowedTypes.test(
            file.originalname.toLowerCase().split('.').pop()
        );
        const mimetype = allowedTypes.test(file.mimetype);

        return extname && mimetype && file.size <= maxSize;
    }
}

module.exports = new FileService();
