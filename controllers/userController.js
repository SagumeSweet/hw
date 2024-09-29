const userService = require('../services/userService');

class UserController {
    async register(req, res) {
        try {
            const user = await userService.registerUser(req.body);
            return res.status(201).json(user);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }

    async login(req, res) {
        try {
            const user = await userService.loginUser(
                req.body.email,
                req.body.password
            );
            return res.status(200).json(user);
        } catch (error) {
            return res.status(401).json({ message: error.message });
        }
    }

    async getUserByIdFromPublic(req, res) {
        try {
            const user = await userService.getUserById(req.params.id);
            return res.status(200).json(user);
        } catch (error) {
            return res.status(404).json({ message: error.message });
        }
    }

    async getSelfInfo(req, res) {
        try {
            const user = await userService.getUserById(req.user.id); // 假设 req.user 已通过中间件设置
            return res.status(200).json(user);
        } catch (error) {
            return res.status(404).json({ message: error.message });
        }
    }

    async updateUser(req, res) {
        try {
            await userService.updateUser(req.user.id, req.body);
            return res.status(200).json({ message: '修改成功' });
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }

    async updateUserRole(req, res) {
        try {
            const { role, price } = req.body;
            await userService.updateRole(req.user.id, role, price);
            return res.status(200).json({ message: '修改成功' });
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }

}

module.exports = new UserController();
