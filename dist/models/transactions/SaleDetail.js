"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaleDetail = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../../database/db");
class SaleDetail extends sequelize_1.Model {
}
exports.SaleDetail = SaleDetail;
SaleDetail.init({
    id: { type: sequelize_1.DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    saleId: { type: sequelize_1.DataTypes.INTEGER.UNSIGNED, allowNull: false },
    medicationId: { type: sequelize_1.DataTypes.INTEGER.UNSIGNED, allowNull: false },
    quantity: { type: sequelize_1.DataTypes.INTEGER, allowNull: false, validate: { min: 1 } },
    unitPrice: { type: sequelize_1.DataTypes.DECIMAL(12, 2), allowNull: false, validate: { min: 0 } },
    discount: { type: sequelize_1.DataTypes.DECIMAL(12, 2), allowNull: true, validate: { min: 0 } },
}, { sequelize: db_1.sequelize, modelName: "SaleDetail", tableName: "sale_details", timestamps: false });
// Relaciones: ya se establecen en Sale.ts (Sale ↔ SaleDetail) y Medication.ts (Medication ↔ SaleDetail)
