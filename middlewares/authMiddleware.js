const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    if (req.user) {
        return res.status(401).json({ message: '恶意请求' });
    }
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: '未授权' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: '无效的令牌' });
        }
        req.user = user;
        next();
    });
};

module.exports = { authenticate };
