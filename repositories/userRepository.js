const { User } = require('../models');

class UserRepository {
    async createUser(data) {
        return await User.create(data);
    }

    async findUserByUsername(username) {
        return await User.findOne({ where: { username: username } });
    }

    async findUserByEmail(email) {
        const user = await User.findOne({ where: { email: email } });
        return user;
    }

    async findUserById(id) {
        return await User.findByPk(id);
    }

    async updateUser(id, data) {
        return await User.update(data, { where: { id }, returning: true });
    }

    async deleteUser(id) {
        return await User.destroy({ where: { id } });
    }
}

module.exports = new UserRepository();
