"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Medication = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../../database/db");
const Lot_1 = require("./Lot");
const RecipeDetail_1 = require("../persons/RecipeDetail");
const SaleDetail_1 = require("../transactions/SaleDetail");
class Medication extends sequelize_1.Model {
}
exports.Medication = Medication;
Medication.init({
    id: { type: sequelize_1.DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    name: { type: sequelize_1.DataTypes.STRING(160), allowNull: false, unique: true },
    description: { type: sequelize_1.DataTypes.STRING(255) },
    unit: { type: sequelize_1.DataTypes.STRING(32) },
    price: { type: sequelize_1.DataTypes.DECIMAL(12, 2), allowNull: false, validate: { min: 0 } },
    stock: { type: sequelize_1.DataTypes.INTEGER, allowNull: false, defaultValue: 0, validate: { min: 0 } },
    categoryId: { type: sequelize_1.DataTypes.INTEGER.UNSIGNED, allowNull: false },
    status: { type: sequelize_1.DataTypes.ENUM("AVAILABLE", "UNAVAILABLE"), allowNull: false, defaultValue: "AVAILABLE" },
}, { sequelize: db_1.sequelize, modelName: "Medication", tableName: "medications", timestamps: false });
// Relaciones (lado Medication)
Medication.hasMany(Lot_1.Lot, { foreignKey: "medicationId", sourceKey: "id" });
Lot_1.Lot.belongsTo(Medication, { foreignKey: "medicationId", targetKey: "id" });
Medication.hasMany(RecipeDetail_1.RecipeDetail, { foreignKey: "medicationId", sourceKey: "id" });
RecipeDetail_1.RecipeDetail.belongsTo(Medication, { foreignKey: "medicationId", targetKey: "id" });
Medication.hasMany(SaleDetail_1.SaleDetail, { foreignKey: "medicationId", sourceKey: "id" });
SaleDetail_1.SaleDetail.belongsTo(Medication, { foreignKey: "medicationId", targetKey: "id" });
