"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Customer = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../../database/db");
const Sale_1 = require("../transactions/Sale");
const Recipe_1 = require("./Recipe");
class Customer extends sequelize_1.Model {
}
exports.Customer = Customer;
Customer.init({
    id: { type: sequelize_1.DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    username: { type: sequelize_1.DataTypes.STRING(64), allowNull: false, unique: true },
    password: { type: sequelize_1.DataTypes.STRING(255) },
    firstName: { type: sequelize_1.DataTypes.STRING(80), allowNull: false },
    lastName: { type: sequelize_1.DataTypes.STRING(80), allowNull: false },
    documentType: { type: sequelize_1.DataTypes.ENUM("CC", "TI", "CE", "PP", "NIT"), allowNull: false },
    documentNumber: { type: sequelize_1.DataTypes.STRING(40), allowNull: false },
    phone: { type: sequelize_1.DataTypes.STRING(32) },
    email: { type: sequelize_1.DataTypes.STRING(160), validate: { isEmail: true } },
    address: { type: sequelize_1.DataTypes.STRING(255) },
    status: { type: sequelize_1.DataTypes.ENUM("ACTIVE", "INACTIVE"), allowNull: false, defaultValue: "ACTIVE" },
}, {
    sequelize: db_1.sequelize,
    modelName: "Customer",
    tableName: "customers",
    timestamps: false,
    indexes: [{ unique: true, fields: ["documentType", "documentNumber"] }],
});
// Relaciones
Customer.hasMany(Sale_1.Sale, { foreignKey: "customerId", sourceKey: "id" });
Sale_1.Sale.belongsTo(Customer, { foreignKey: "customerId", targetKey: "id" });
Customer.hasMany(Recipe_1.Recipe, { foreignKey: "customerId", sourceKey: "id" });
Recipe_1.Recipe.belongsTo(Customer, { foreignKey: "customerId", targetKey: "id" });
