"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleUser = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../../database/db");
class RoleUser extends sequelize_1.Model {
}
exports.RoleUser = RoleUser;
RoleUser.init({
    is_active: {
        type: sequelize_1.DataTypes.ENUM("ACTIVE", "INACTIVE"),
        defaultValue: "ACTIVE",
    }
}, {
    tableName: "role_users",
    sequelize: db_1.sequelize,
    timestamps: false
});
