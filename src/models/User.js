const { DataTypes } = require("sequelize");
const sequelize = require("../infra/sequelize");

const User = sequelize.define(
    "users",
    {
        id: {
            primaryKey: true,
            unique: true,
            allowNull: false,
            type: DataTypes.STRING,
        },
        name: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        email: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        password: {
            allowNull: false,
            type: DataTypes.STRING,
        },
    },
    { timestamps: true }
);

module.exports = User;
