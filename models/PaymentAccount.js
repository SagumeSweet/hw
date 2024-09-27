// models/PaymentAccount.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const PaymentAccount = sequelize.define(
    'PaymentAccount',
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
        account_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        account_info: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isDefault: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    },
    {
        indexes: [
            {
                unique: true,
                fields: ['user_id'],
                where: {
                    isDefault: true,
                },
            },
        ],
        timestamps: true,
    }
);

module.exports = PaymentAccount;
