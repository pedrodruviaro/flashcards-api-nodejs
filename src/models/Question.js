const { DataTypes } = require("sequelize");
const sequelize = require("../infra/sequelize");

const Question = sequelize.define(
    "questions",
    {
        question: {
            allowNull: false,
            type: DataTypes.TEXT,
        },
        answer: {
            allowNull: false,
            type: DataTypes.TEXT,
        },
    },
    { timestamps: true }
);

module.exports = Question;
