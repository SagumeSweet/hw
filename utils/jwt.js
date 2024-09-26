const jwt = require('jsonwebtoken');

// 生成 JWT 令牌
function generateToken(id) {
    const payload = { userId: id }; // 令牌载荷
    const secret = process.env.JWT_SECRET; // 使用环境变量中的密钥
    const options = { expiresIn: '1h' }; // 令牌有效期

    return jwt.sign(payload, secret, options); // 生成 JWT
}

module.exports = {
    generateToken,
};
