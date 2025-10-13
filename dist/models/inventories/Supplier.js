"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Supplier = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../../database/db");
const Lot_1 = require("./Lot");
class Supplier extends sequelize_1.Model {
}
exports.Supplier = Supplier;
Supplier.init({
    id: { type: sequelize_1.DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    name: { type: sequelize_1.DataTypes.STRING(120), allowNull: false, unique: true },
    contactName: { type: sequelize_1.DataTypes.STRING(120) },
    phone: { type: sequelize_1.DataTypes.STRING(32) },
    email: { type: sequelize_1.DataTypes.STRING(160), validate: { isEmail: true } },
    address: { type: sequelize_1.DataTypes.STRING(255) },
    status: { type: sequelize_1.DataTypes.ENUM("ACTIVE", "INACTIVE"), allowNull: false, defaultValue: "ACTIVE" },
}, { sequelize: db_1.sequelize, modelName: "Supplier", tableName: "suppliers", timestamps: false });
// Relaciones
Supplier.hasMany(Lot_1.Lot, { foreignKey: "supplierId", sourceKey: "id" });
Lot_1.Lot.belongsTo(Supplier, { foreignKey: "supplierId", targetKey: "id" });
