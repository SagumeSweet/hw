const userService = require('../services/userService'); 
const { UserRegisterDTO, UserLoginDTO } = require('../dto/userDTO'); 
const { plainToClass } = require('class-transformer'); 
const { validate } = require('class-validator'); 

// 用户注册控制器
exports.register = async (req, res) => {
    // 使用 plainToClass 将请求体转换为 UserRegisterDTO 实例
    const userRegisterDTO = plainToClass(UserRegisterDTO, req.body);

    // 验证 DTO 实例
    const errors = await validate(userRegisterDTO);
    if (errors.length > 0) {
        // 如果验证失败，返回 400 状态码和错误信息
        return res.status(400).json({ errors });
    }

    try {
        // 调用用户服务的注册方法，传入注册 DTO
        const response = await userService.register(userRegisterDTO);
        // 返回 201 状态码和注册成功的响应
        res.status(201).json(response);
    } catch (err) {
        // 捕获错误并返回 500 状态码和错误消息
        res.status(500).json({ error: err.message });
    }
};

// 用户登录控制器
exports.login = async (req, res) => {
    // 使用 plainToClass 将请求体转换为 UserLoginDTO 实例
    const userLoginDTO = plainToClass(UserLoginDTO, req.body);

    // 验证 DTO 实例
    const errors = await validate(userLoginDTO);
    if (errors.length > 0) {
        // 如果验证失败，返回 400 状态码和错误信息
        return res.status(400).json({ errors });
    }

    try {
        // 调用用户服务的登录方法，传入登录 DTO
        const response = await userService.login(userLoginDTO);
        // 返回登录成功的响应
        res.json(response);
    } catch (err) {
        // 捕获错误并返回 401 状态码和错误消息
        res.status(401).json({ message: err.message });
    }
};
