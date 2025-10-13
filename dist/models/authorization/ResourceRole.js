"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourceRole = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../../database/db");
const Resource_1 = require("./Resource");
const Role_1 = require("./Role");
class ResourceRole extends sequelize_1.Model {
}
exports.ResourceRole = ResourceRole;
ResourceRole.init({
    is_active: {
        type: sequelize_1.DataTypes.ENUM("ACTIVE", "INACTIVE"),
        defaultValue: "ACTIVE",
    },
}, {
    tableName: "resource_roles",
    sequelize: db_1.sequelize,
    timestamps: false,
});
Resource_1.Resource.hasMany(ResourceRole, {
    foreignKey: "resource_id",
    sourceKey: "id",
});
ResourceRole.belongsTo(Resource_1.Resource, {
    foreignKey: "resource_id",
    targetKey: "id",
});
Role_1.Role.hasMany(ResourceRole, {
    foreignKey: "role_id",
    sourceKey: "id",
});
ResourceRole.belongsTo(Role_1.Role, {
    foreignKey: "role_id",
    targetKey: "id",
});
