// models/Content.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Content = sequelize.define(
    'Content',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        creator_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        body: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        content_type: {
            type: DataTypes.ENUM('public', 'subscriber'),
            allowNull: false,
            defaultValue: 'public',
        },
        media_url: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        media_type: {
            type: DataTypes.ENUM('image', 'video'),
            allowNull: true,
        },
    },
    {
        timestamps: true,
    }
);


module.exports = Content;
