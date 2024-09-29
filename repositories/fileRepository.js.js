// repositories/fileRepository.js
const fs = require('fs');
const path = require('path');

class FileRepository {
    constructor() {
        this.uploadDir = path.join(__dirname, '../uploads');
        // 确保目录存在
        if (!fs.existsSync(this.uploadDir)) {
            fs.mkdirSync(this.uploadDir, { recursive: true });
        }
    }

    // 保存文件到指定路径
    async saveFile(file) {
        const filePath = path.join(this.uploadDir, file.originalname);
        await fs.promises.writeFile(filePath, file.buffer);
        return filePath; // 返回文件路径
    }

    // 获取文件内容
    async getFile(filePath) {
        return await fs.promises.readFile(filePath);
    }
}

module.exports = new FileRepository();
