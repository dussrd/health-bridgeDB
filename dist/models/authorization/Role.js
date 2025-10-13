"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Role = void 0;
const sequelize_1 = require("sequelize");
const RoleUser_1 = require("./RoleUser");
const db_1 = require("../../database/db");
class Role extends sequelize_1.Model {
}
exports.Role = Role;
Role.init({
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    is_active: {
        type: sequelize_1.DataTypes.ENUM("ACTIVE", "INACTIVE"),
        defaultValue: "ACTIVE",
    }
}, {
    tableName: "roles",
    sequelize: db_1.sequelize,
    timestamps: false
});
Role.hasMany(RoleUser_1.RoleUser, {
    foreignKey: 'role_id',
    sourceKey: "id",
});
RoleUser_1.RoleUser.belongsTo(Role, {
    foreignKey: 'role_id',
    targetKey: "id",
});
