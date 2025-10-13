"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshToken = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../../database/db");
const User_1 = require("./User");
class RefreshToken extends sequelize_1.Model {
    ;
}
exports.RefreshToken = RefreshToken;
RefreshToken.init({
    token: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    device_info: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    is_valid: {
        type: sequelize_1.DataTypes.ENUM("ACTIVE", "INACTIVE"),
        defaultValue: "ACTIVE",
    },
    expires_at: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true
    },
    created_at: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true
    },
    updated_at: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true
    }
}, {
    tableName: "refresh_tokens",
    sequelize: db_1.sequelize,
    timestamps: false,
    hooks: {
        beforeCreate: (refreshToken) => {
            const currentDate = new Date();
            refreshToken.created_at = currentDate;
            refreshToken.updated_at = currentDate;
        },
        beforeUpdate: (refreshToken) => {
            const currentDate = new Date();
            refreshToken.updated_at = currentDate;
        }
    }
});
User_1.User.hasMany(RefreshToken, {
    foreignKey: 'user_id',
    sourceKey: "id",
});
RefreshToken.belongsTo(User_1.User, {
    foreignKey: 'user_id',
    targetKey: "id",
});
