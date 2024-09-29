// controllers/fileController.js
const upload = require('../middleware/uploadMiddleware');
const userService = require('../services/userService');
const fileService = require('../services/fileService');

class FileController {
    // 上传头像
    async uploadAvatar(req, res) {
        const userId = req.user.id; 

        try {
            const filePath = await fileService.uploadAvatar(userId, req.file);
            return res.status(200).json({ message: '头像上传成功', filePath });
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }

    // 上传内容文件
    async uploadContent(req, res) {
        const userId = req.user.id;

        try {
            const filePath = await fileService.uploadContent(userId, req.file);
            return res
                .status(200)
                .json({ message: '文件上传成功', filePath });
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }

    // 发送头像
    async getAvatar(req, res) {
        const userId = req.params.id;
        try {
            const fileBuffer = await fileService.sendAvatar(userId);
            return res.status(200).send(fileBuffer);
        } catch (error) {
            return res.status(404).json({ message: error.message });
        }
    }

    // 发送内容媒体
    async getContentMedia(req, res) {
        const userId = req.user.id;
        const contentId = req.params.contentId;

        try {
            const fileBuffer = await fileService.sendContentMedia(
                userId,
                contentId
            );
            return res.status(200).send(fileBuffer);
        } catch (error) {
            return res.status(404).json({ message: error.message });
        }
    }
}

module.exports = new FileController();
