import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../database/db";
import { RecipeDetail } from "./RecipeDetail";
import { Medication } from "../inventories/Medication";

export interface RecipeI {
  id?: number;
  customerId: number;
  issuedAt: string;
  notes?: string;
  status: "VALID" | "EXPIRED";
}

type RecipeCreation = Optional<RecipeI, "id" | "notes">;

export class Recipe extends Model<RecipeI, RecipeCreation> implements RecipeI {
  public id!: number;
  public customerId!: number;
  public issuedAt!: string;
  public notes?: string;
  public status!: "VALID" | "EXPIRED";
}

Recipe.init(
  {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    customerId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    issuedAt: { type: DataTypes.DATE, allowNull: false },
    notes: { type: DataTypes.STRING(500) },
    status: { type: DataTypes.ENUM("VALID", "EXPIRED"), allowNull: false, defaultValue: "VALID" },
  },
  { sequelize, modelName: "Recipe", tableName: "recipes", timestamps: false }
);

// Relaciones (lado Recipe y Medication para detalles)
Recipe.hasMany(RecipeDetail, { foreignKey: "recipeId", sourceKey: "id" });
RecipeDetail.belongsTo(Recipe, { foreignKey: "recipeId", targetKey: "id" });

Medication.hasMany(RecipeDetail, { foreignKey: "medicationId", sourceKey: "id" });
RecipeDetail.belongsTo(Medication, { foreignKey: "medicationId", targetKey: "id" });
// (Recipe ↔ Customer ya se declaró en Customer.ts)
