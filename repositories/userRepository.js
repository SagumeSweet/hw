const db = require('../config/db'); // 引入数据库配置
const User = require('../models/User'); // 引入用户模型

class UserRepository {
    // 创建新用户
    async create(email, password, username) {
        // SQL 查询语句，用于插入新用户
        const query = 'INSERT INTO users (email, password, username) VALUES (?, ?, ?)';
        // 执行查询并获取结果
        const [result] = await db.query(query, [email, password, username]);
        // 返回新创建的用户实例，包含用户 ID 和基本信息
        return new User(result.insertId, email, password, username);
    }

    // 根据邮箱查找用户
    async findByEmail(email) {
        // SQL 查询语句，用于查找特定邮箱的用户
        const query = 'SELECT * FROM users WHERE email = ?';
        // 执行查询并获取结果
        const [rows] = await db.query(query, [email]);
        // 如果找到用户，返回用户实例，否则返回 null
        return rows.length > 0 ? new User(rows[0].id, rows[0].email, rows[0].password, rows[0].username) : null;
    }
}

module.exports = new UserRepository(); // 导出 UserRepository 实例
