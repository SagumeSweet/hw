const path = require('path');
const fileRepository = require('../repositories/fileRepository');
const contentService = require('./contentService');
const userService = require('./userService');
const { v4: uuidv4 } = require('uuid'); // 用于生成唯一文件名

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

        // 根据文件类型生成文件夹路径和文件名
        const folderPath = 'avatars';
        const fileName = this.generateFileName(file.originalname);

        // 保存文件到特定文件夹
        const filePath = await fileRepository.saveFile(
            file,
            path.join(folderPath, fileName)
        );

        // 保存头像路径到用户信息
        await userService.updateUser(userId, { avatar: filePath });

        return filePath;
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


        // 根据文件类型确定文件夹
        const fileType = validTypes[file.mimetype];
        if (!fileType) {
            throw new Error('不支持的文件类型');
        }

        const folderPath =
            fileType === 'image' ? 'contents/images' : 'contents/videos';
        const fileName = this.generateFileName(file.originalname);

        // 保存文件到指定文件夹
        const filePath = await fileRepository.saveFile(
            file,
            path.join(folderPath, fileName)
        );

        // 返回文件路径和类型
        return {
            filePath,
            fileType,
        };
    }

    // 发送头像
    async sendAvatar(userId) {
        const user = await userService.getUserById(userId);
        if (!user || !user.avatar) {
            throw new Error('头像未找到');
        }

        const filePath = user.avatar;
        // return await fileRepository.getFile(filePath);
        return filePath
    }

    // 发送内容媒体
    async sendContentMedia(userId, contentId) {
        const content = await contentService.getContent(userId, contentId);
        if (!content) {
            throw new Error('内容未找到');
        }
        if (content.mediaUrl) {
            // return await fileRepository.getFile(content.mediaUrl);
            return content.mediaUrl
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

    // 生成唯一文件名，避免重复
    generateFileName(originalName) {
        const fileExt = path.extname(originalName).toLowerCase(); // 提取文件扩展名
        return `${uuidv4()}${fileExt}`; // 生成唯一文件名
    }
}

module.exports = new FileService();
