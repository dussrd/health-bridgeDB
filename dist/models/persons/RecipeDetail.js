"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipeDetail = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../../database/db");
class RecipeDetail extends sequelize_1.Model {
}
exports.RecipeDetail = RecipeDetail;
RecipeDetail.init({
    id: { type: sequelize_1.DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    recipeId: { type: sequelize_1.DataTypes.INTEGER.UNSIGNED, allowNull: false },
    medicationId: { type: sequelize_1.DataTypes.INTEGER.UNSIGNED, allowNull: false },
    dosage: { type: sequelize_1.DataTypes.STRING(120), allowNull: false },
    quantity: { type: sequelize_1.DataTypes.INTEGER, allowNull: false, validate: { min: 1 } },
}, { sequelize: db_1.sequelize, modelName: "RecipeDetail", tableName: "recipe_details", timestamps: false });
// Relaciones: ya se establecen en Recipe.ts (Recipe ↔ RecipeDetail) y Medication.ts (Medication ↔ RecipeDetail)
