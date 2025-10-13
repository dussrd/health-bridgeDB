import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../database/db";

export interface RecipeDetailI {
  id?: number;
  recipeId: number;
  medicationId: number;
  dosage: string;
  quantity: number;
}

type RecipeDetailCreation = Optional<RecipeDetailI, "id">;

export class RecipeDetail extends Model<RecipeDetailI, RecipeDetailCreation> implements RecipeDetailI {
  public id!: number;
  public recipeId!: number;
  public medicationId!: number;
  public dosage!: string;
  public quantity!: number;
}

RecipeDetail.init(
  {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    recipeId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    medicationId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    dosage: { type: DataTypes.STRING(120), allowNull: false },
    quantity: { type: DataTypes.INTEGER, allowNull: false, validate: { min: 1 } },
  },
  { sequelize, modelName: "RecipeDetail", tableName: "recipe_details", timestamps: false }
);

// Relaciones: ya se establecen en Recipe.ts (Recipe ↔ RecipeDetail) y Medication.ts (Medication ↔ RecipeDetail)
