import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../database/db";
import { Lot } from "./Lot";
import { RecipeDetail } from "../persons/RecipeDetail";
import { SaleDetail } from "../transactions/SaleDetail";

export interface MedicationI {
  id?: number;
  name: string;
  description?: string;
  unit?: string;
  price: number;
  stock: number;
  categoryId: number;
  status: "AVAILABLE" | "UNAVAILABLE";
}

type MedicationCreation = Optional<MedicationI, "id" | "description" | "unit">;

export class Medication extends Model<MedicationI, MedicationCreation> implements MedicationI {
  public id!: number;
  public name!: string;
  public description?: string;
  public unit?: string;
  public price!: number;
  public stock!: number;
  public categoryId!: number;
  public status!: "AVAILABLE" | "UNAVAILABLE";
}

Medication.init(
  {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING(160), allowNull: false, unique: true },
    description: { type: DataTypes.STRING(255) },
    unit: { type: DataTypes.STRING(32) },
    price: { type: DataTypes.DECIMAL(12,2), allowNull: false, validate: { min: 0 } },
    stock: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0, validate: { min: 0 } },
    categoryId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    status: { type: DataTypes.ENUM("AVAILABLE", "UNAVAILABLE"), allowNull: false, defaultValue: "AVAILABLE" },
  },
  { sequelize, modelName: "Medication", tableName: "medications", timestamps: false }
);

// Relaciones (lado Medication)
Medication.hasMany(Lot, { foreignKey: "medicationId", sourceKey: "id" });
Lot.belongsTo(Medication, { foreignKey: "medicationId", targetKey: "id" });

Medication.hasMany(RecipeDetail, { foreignKey: "medicationId", sourceKey: "id" });
RecipeDetail.belongsTo(Medication, { foreignKey: "medicationId", targetKey: "id" });

Medication.hasMany(SaleDetail, { foreignKey: "medicationId", sourceKey: "id" });
SaleDetail.belongsTo(Medication, { foreignKey: "medicationId", targetKey: "id" });
