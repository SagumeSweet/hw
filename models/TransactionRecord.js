// models/TransactionRecord.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const TransactionRecord = sequelize.define(
    'TransactionRecord',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        type: {
            type: DataTypes.ENUM('income', 'expense'),
            allowNull: false,
        },
        amount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        closedAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    },
    {
        timestamps: false,
    }
);

module.exports = TransactionRecord;
