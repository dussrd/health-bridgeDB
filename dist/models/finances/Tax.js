"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tax = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../../database/db");
class Tax extends sequelize_1.Model {
}
exports.Tax = Tax;
Tax.init({
    id: { type: sequelize_1.DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    name: { type: sequelize_1.DataTypes.STRING(64), allowNull: false, unique: true },
    rate: { type: sequelize_1.DataTypes.DECIMAL(6, 4), allowNull: false, validate: { min: 0, max: 1 } },
    status: { type: sequelize_1.DataTypes.ENUM("ACTIVE", "INACTIVE"), allowNull: false, defaultValue: "ACTIVE" },
}, { sequelize: db_1.sequelize, modelName: "Tax", tableName: "taxes", timestamps: false });
// Relaciones con Sale: definidas en models/transactions/Sale.ts
