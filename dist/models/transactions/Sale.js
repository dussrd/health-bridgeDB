"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sale = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../../database/db");
const SaleDetail_1 = require("./SaleDetail");
const Payment_1 = require("./Payment");
const Tax_1 = require("../finances/Tax");
class Sale extends sequelize_1.Model {
}
exports.Sale = Sale;
Sale.init({
    id: { type: sequelize_1.DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    customerId: { type: sequelize_1.DataTypes.INTEGER.UNSIGNED, allowNull: false },
    saleDate: { type: sequelize_1.DataTypes.DATE, allowNull: false },
    subtotal: { type: sequelize_1.DataTypes.DECIMAL(12, 2), allowNull: false, validate: { min: 0 } },
    taxTotal: { type: sequelize_1.DataTypes.DECIMAL(12, 2), allowNull: false, validate: { min: 0 } },
    total: { type: sequelize_1.DataTypes.DECIMAL(12, 2), allowNull: false, validate: { min: 0 } },
    status: { type: sequelize_1.DataTypes.ENUM("ACTIVE", "CANCELLED"), allowNull: false, defaultValue: "ACTIVE" },
    taxId: { type: sequelize_1.DataTypes.INTEGER.UNSIGNED },
}, { sequelize: db_1.sequelize, modelName: "Sale", tableName: "sales", timestamps: false });
// Relaciones
Sale.hasMany(SaleDetail_1.SaleDetail, { foreignKey: "saleId", sourceKey: "id" });
SaleDetail_1.SaleDetail.belongsTo(Sale, { foreignKey: "saleId", targetKey: "id" });
Sale.hasOne(Payment_1.Payment, { foreignKey: "saleId", sourceKey: "id" });
Payment_1.Payment.belongsTo(Sale, { foreignKey: "saleId", targetKey: "id" });
Tax_1.Tax.hasMany(Sale, { foreignKey: "taxId", sourceKey: "id" });
Sale.belongsTo(Tax_1.Tax, { foreignKey: "taxId", targetKey: "id" });
// (Sale ↔ Customer ya se declaró en Customer.ts)
