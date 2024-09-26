// models/User.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    role: {
        type: DataTypes.ENUM('normal', 'creator'),
        allowNull: false,
        defaultValue: 'normal'
    },
    avatar: {
        type: DataTypes.STRING,
        allowNull: false, // 不可为 null
        defaultValue: 'default_avatar.png', // 默认头像
    },
    subscription_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false, // 不可为 null
        defaultValue: 0, // 默认值为 0
    },
});

module.exports = User;
