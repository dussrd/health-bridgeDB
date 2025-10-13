"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Resource = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../../database/db");
class Resource extends sequelize_1.Model {
}
exports.Resource = Resource;
Resource.init({
    path: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: { msg: "Path cannot be empty" },
        },
    },
    method: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: { msg: "Method cannot be empty" },
        },
    },
    is_active: {
        type: sequelize_1.DataTypes.ENUM("ACTIVE", "INACTIVE"),
        defaultValue: "ACTIVE",
    },
}, {
    tableName: "resources",
    sequelize: db_1.sequelize,
    timestamps: false,
});
