const bcrypt = require('bcryptjs');
const userRepository = require('../repositories/userRepository');
const paymentAccountService = require('./paymentAccountService');
const { generateToken } = require('../utils/jwt'); // 导入 jwt 工具
const { Type } = require('class-transformer');

class UserService {
    // 注册用户
    async registerUser(userData) {
        const existingUser = await userRepository.findUserByUsername(
            userData.username
        );
        if (existingUser) {
            throw new Error('用户名已存在');
        }
        const existingEmail = await userRepository.findUserByEmail(
            userData.email
        );
        if (existingEmail) {
            throw new Error('邮箱已存在');
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
            token: token, // 返回 JWT
            user: this.filterUserData(user), // 返回用户信息
        };
    }

    // 根据用户ID获取用户信息
    async getUserById(id) {
        const user = await userRepository.findUserById(id);
        if (!user) {
            throw new Error(`id=${id} 用户不存在`);
        }

        return this.filterUserData(user);
    }

    async getUserByIdFromPublic(id) {
        const user = await this.getUserById;
        return {
            id: user.id,
            username: user.username,
            role: user.role,
            avatar: user.avatar,
        }
    }

    // 更新用户信息
    async updateUser(id, data) {
        if (data.password) {
            throw new Error('密码用访问专用接口更新');
        } else if (data.email) {
            throw new Error('邮箱不可更新');
        } else if (data.role) {
            throw new Error('更新角色用专用接口');
        }
        const user = await userRepository.updateUser(id, data);
        return this.filterUserData(user);
    }

    async updateRole(id, role, price) {
        const user = await userRepository.findUserById(id);
        console.log(price);
        if (user.role === role) {
            throw new Error(`用户角色已是${role}`);
        }
        if (role === 'creator') {
            if (
                (await paymentAccountService.getUserPaymentAccounts(id))
                    .length === 0
            ) {
                throw new Error('无支付账户');
            }
            if (!price || price <= 0) {
                throw new Error('价格设置错误');
            }
            await userRepository.updateUser(id, {
                role: role,
                subscription_price: price,
            });
        } else if (role === 'normal') {
            await userRepository.updateUser(id, {
                role,
                subscription_price: 0,
            });
        } else {
            throw new Error('参数错误');
        }
    }

    // 筛选用户信息
    filterUserData(user) {
        if (user.role === 'normal') {
            return {
                id: user.id,
                username: user.username,
                role: user.role,
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
                price: user.subscription_price,
            };
        }
    }
}

module.exports = new UserService();
