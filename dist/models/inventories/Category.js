"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../../database/db");
const Medication_1 = require("./Medication");
class Category extends sequelize_1.Model {
}
exports.Category = Category;
Category.init({
    id: { type: sequelize_1.DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    name: { type: sequelize_1.DataTypes.STRING(80), allowNull: false, unique: true },
    description: { type: sequelize_1.DataTypes.STRING(255) },
    status: { type: sequelize_1.DataTypes.ENUM("ACTIVE", "INACTIVE"), allowNull: false, defaultValue: "ACTIVE" },
}, { sequelize: db_1.sequelize, modelName: "Category", tableName: "categories", timestamps: false });
// Relaciones
Category.hasMany(Medication_1.Medication, { foreignKey: "categoryId", sourceKey: "id" });
Medication_1.Medication.belongsTo(Category, { foreignKey: "categoryId", targetKey: "id" });
