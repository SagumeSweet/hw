const bcrypt = require('bcryptjs'); // 引入 bcrypt 库，用于密码加密和验证
const userRepository = require('../repositories/userRepository'); // 引入用户数据仓库，处理数据库操作
const { UserResponseDTO } = require('../dto/userDTO'); // 引入用户响应 DTO，用于规范化返回数据格式

class UserService {
    // 用户注册方法
    async register(userRegisterDTO) {
        // 使用 bcrypt 对密码进行加密，10 表示加密强度
        const hashedPassword = await bcrypt.hash(userRegisterDTO.password, 10);
        
        // 调用用户仓库的 create 方法，插入新用户数据并返回用户对象
        const user = await userRepository.create(userRegisterDTO.email, hashedPassword, userRegisterDTO.username);
        
        // 返回注册成功的响应，包含用户信息
        return new UserResponseDTO("用户注册成功", {
            id: user.id,
            email: user.email,
            username: user.username,
        });
    }

    // 用户登录方法
    async login(userLoginDTO) {
        // 根据电子邮件查找用户
        const user = await userRepository.findByEmail(userLoginDTO.email);
        
        // 验证用户是否存在，以及输入的密码是否与存储的密码匹配
        if (!user || !(await bcrypt.compare(userLoginDTO.password, user.password))) {
            throw new Error('邮箱不存在或密码错误'); // 抛出错误提示
        }
        
        // 返回登录成功的响应，包含用户信息
        return new UserResponseDTO("登录成功", {
            id: user.id,
            email: user.email,
            username: user.username,
        });
    }
}

// 导出 UserService 实例，供其他模块使用
module.exports = new UserService();
