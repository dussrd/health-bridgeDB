"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Payment = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../../database/db");
class Payment extends sequelize_1.Model {
}
exports.Payment = Payment;
Payment.init({
    id: { type: sequelize_1.DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    saleId: { type: sequelize_1.DataTypes.INTEGER.UNSIGNED, allowNull: false, unique: true },
    amount: { type: sequelize_1.DataTypes.DECIMAL(12, 2), allowNull: false, validate: { min: 0 } },
    method: { type: sequelize_1.DataTypes.ENUM("CASH", "CARD", "TRANSFER", "OTHER"), allowNull: false },
    paidAt: { type: sequelize_1.DataTypes.DATE },
    status: { type: sequelize_1.DataTypes.ENUM("PENDING", "PAID", "REFUNDED"), allowNull: false, defaultValue: "PENDING" },
    reference: { type: sequelize_1.DataTypes.STRING(120) },
}, { sequelize: db_1.sequelize, modelName: "Payment", tableName: "payments", timestamps: false });
// Relaciones: ya se establecen en Sale.ts (Sale ↔ Payment)
