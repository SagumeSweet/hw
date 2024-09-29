// controllers/fileController.js
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
        console.log(req.file);
        try {
            const filePath = await fileService.uploadContent(userId, req.file);
            return res.status(200).json({ message: '文件上传成功', filePath });
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }

    // 发送头像
    async getAvatar(req, res) {
        const userId = req.params.id;
        try {
            // const fileBuffer = await fileService.sendAvatar(userId);
            const path = await fileService.sendAvatar(userId);
            return res.status(200).sendFile(path);
            // return res.status(200).send
        } catch (error) {
            return res.status(404).json({ message: error.message });
        }
    }

    // 发送内容媒体
    async getContentMedia(req, res) {
        const userId = req.user.id;
        const contentId = req.params.contentId;

        try {
            const path = await fileService.sendContentMedia(
                userId,
                contentId
            );
            return res.status(200).sendFile(path);
        } catch (error) {
            return res.status(404).json({ message: error.message });
        }
    }
}

module.exports = new FileController();
