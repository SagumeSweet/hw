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

    // 保存文件到指定路径，允许自定义路径或文件名
    async saveFile(file, customFilePath = null) {
        const filePath = customFilePath
            ? path.join(this.uploadDir, customFilePath) // 使用自定义路径或文件名
            : path.join(this.uploadDir, file.originalname); // 使用默认路径和文件名

        // 确保目录存在
        const dir = path.dirname(filePath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        // 保存文件
        await fs.promises.writeFile(filePath, file.buffer);
        return filePath; // 返回文件路径
    }

    // 获取文件内容
    async getFile(filePath) {
        return await fs.promises.readFile(filePath);
    }
}

module.exports = new FileRepository();
