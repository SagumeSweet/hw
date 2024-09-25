const jwt = require('jsonwebtoken');

exports.authenticate = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).json({ message: '没有提供token' });
    
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(500).json({ message: '无法验证token' });
        req.user = decoded;  // 将解码的用户信息添加到请求对象中
        next();
    });
};
