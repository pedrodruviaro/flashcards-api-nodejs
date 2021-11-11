const { DataTypes } = require("sequelize");
const sequelize = require("../infra/sequelize");

const Collection = sequelize.define(
    "collections",
    {
        name: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        category: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        description: {
            allowNull: false,
            type: DataTypes.TEXT,
        },
        public: {
            allowNull: true,
            defaultValue: true,
            type: DataTypes.BOOLEAN,
        },
    },
    { timestamps: true }
);

module.exports = Collection;
