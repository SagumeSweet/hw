const bcrypt = require('bcryptjs');
const userRepository = require('../repositories/userRepository');
const { generateToken } = require('../utils/jwt'); // 导入 jwt 工具

class UserService {
    // 注册用户
    async registerUser(userData) {
        const existingUser = await userRepository.findUserByUsername(
            userData.username
        );
        if (existingUser) {
            throw new Error('用户已存在');
        }

        const hashedPassword = await bcrypt.hash(userData.password, 10);
        const newUserData = {
            ...userData,
            password: hashedPassword,
            avatar: 'default_avatar.png',
            subscription_price: 0,
        };
        const user = await userRepository.createUser(newUserData);
        return this.filterUserData(user);
    }

    // 登录用户
    async loginUser(email, password) {
        const user = await userRepository.findUserByEmail(email);

        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new Error('用户名或密码错误');
        }

        const token = generateToken(user.id); // 使用工具生成 JWT
        return {
            token, // 返回 JWT
            user: this.filterUserData(user), // 返回用户信息
        };
    }

    // 根据用户ID获取用户信息
    async getUserById(id) {
        const user = await userRepository.findUserById(id);
        if (!user) {
            throw new Error('用户不存在');
        }

        return this.filterUserData(user);
    }

    // 更新用户信息
    async updateUser(id, data) {
        const user = await userRepository.updateUser(id, data);
        return this.filterUserData(user);
    }

    // 筛选用户信息
    filterUserData(user) {
        if (user.role === 'normal') {
            return {
                id: user.id,
                username: user.username,
                email: user.email,
                avatar: user.avatar,
            };
        } else {
            return {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role,
                avatar: user.avatar,
                subscription_price: user.subscription_price,
            };
        }
    }
}

module.exports = new UserService();
