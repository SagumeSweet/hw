// middleware/responseFormatter.js

const responseFormatter = (req, res, next) => {
    // 存储原始的 res.json 方法
    const originalJson = res.json.bind(res);
    // 重写 res.json 方法
    res.json = (data) => {
        const message = data.message;
        if (message) {
            delete data.message;
        }
        const response = {
            code: res.statusCode, // 从响应状态码提取 code
            data: data || null, // 提取的原始数据
            message: message || getMessage(res.statusCode), // 根据状态码生成消息
        };
        return originalJson(response); // 调用原始的 res.json 方法返回封装后的响应
    };

    next(); // 继续处理请求
};

// 根据状态码生成消息
const getMessage = (statusCode) => {
    switch (statusCode) {
        case 200:
            return '请求成功';
        case 201:
            return '创建成功';
        case 400:
            return '请求错误';
        case 401:
            return '未授权';
        case 404:
            return '未找到';
        case 500:
            return '服务器错误';
        default:
            return '未知错误';
    }
};

module.exports = responseFormatter;
