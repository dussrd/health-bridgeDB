"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lot = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../../database/db");
class Lot extends sequelize_1.Model {
}
exports.Lot = Lot;
Lot.init({
    id: { type: sequelize_1.DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    code: { type: sequelize_1.DataTypes.STRING(64), allowNull: false },
    medicationId: { type: sequelize_1.DataTypes.INTEGER.UNSIGNED, allowNull: false },
    supplierId: { type: sequelize_1.DataTypes.INTEGER.UNSIGNED },
    quantity: { type: sequelize_1.DataTypes.INTEGER, allowNull: false, validate: { min: 1 } },
    expirationDate: { type: sequelize_1.DataTypes.DATEONLY, allowNull: false },
    receivedAt: { type: sequelize_1.DataTypes.DATE },
    status: { type: sequelize_1.DataTypes.ENUM("ACTIVE", "INACTIVE"), allowNull: false, defaultValue: "ACTIVE" },
}, {
    sequelize: db_1.sequelize,
    modelName: "Lot",
    tableName: "lots",
    timestamps: false,
    indexes: [{ unique: true, fields: ["code", "medicationId", "supplierId"] }],
});
// Relaciones: ya se establecen en Medication.ts (Medication ↔ Lot) y Supplier.ts (Supplier ↔ Lot)
