"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Recipe = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../../database/db");
const RecipeDetail_1 = require("./RecipeDetail");
const Medication_1 = require("../inventories/Medication");
class Recipe extends sequelize_1.Model {
}
exports.Recipe = Recipe;
Recipe.init({
    id: { type: sequelize_1.DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    customerId: { type: sequelize_1.DataTypes.INTEGER.UNSIGNED, allowNull: false },
    issuedAt: { type: sequelize_1.DataTypes.DATE, allowNull: false },
    notes: { type: sequelize_1.DataTypes.STRING(500) },
    status: { type: sequelize_1.DataTypes.ENUM("VALID", "EXPIRED"), allowNull: false, defaultValue: "VALID" },
}, { sequelize: db_1.sequelize, modelName: "Recipe", tableName: "recipes", timestamps: false });
// Relaciones (lado Recipe y Medication para detalles)
Recipe.hasMany(RecipeDetail_1.RecipeDetail, { foreignKey: "recipeId", sourceKey: "id" });
RecipeDetail_1.RecipeDetail.belongsTo(Recipe, { foreignKey: "recipeId", targetKey: "id" });
Medication_1.Medication.hasMany(RecipeDetail_1.RecipeDetail, { foreignKey: "medicationId", sourceKey: "id" });
RecipeDetail_1.RecipeDetail.belongsTo(Medication_1.Medication, { foreignKey: "medicationId", targetKey: "id" });
// (Recipe ↔ Customer ya se declaró en Customer.ts)
