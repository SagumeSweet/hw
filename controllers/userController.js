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

    async getUserInfo(req, res) {
        try {
            const user = await userService.getUserById(req.user.userId); // 假设 req.user 已通过中间件设置
            return res.status(200).json(user);
        } catch (error) {
            return res.status(404).json({ message: error.message });
        }
    }

    async updateUser(req, res) {
        try {
            await userService.updateUser(req.user.userId, req.body);
            return res.sendStatus(200);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }
}

module.exports = new UserController();
