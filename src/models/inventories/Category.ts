import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../database/db";
import { Medication } from "./Medication";

export interface CategoryI {
  id?: number;
  name: string;
  description?: string;
  status: "ACTIVE" | "INACTIVE";
}

type CategoryCreation = Optional<CategoryI, "id" | "description">;

export class Category extends Model<CategoryI, CategoryCreation> implements CategoryI {
  public id!: number;
  public name!: string;
  public description?: string;
  public status!: "ACTIVE" | "INACTIVE";
}

Category.init(
  {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING(80), allowNull: false, unique: true },
    description: { type: DataTypes.STRING(255) },
    status: { type: DataTypes.ENUM("ACTIVE", "INACTIVE"), allowNull: false, defaultValue: "ACTIVE" },
  },
  { sequelize, modelName: "Category", tableName: "categories", timestamps: false }
);

// Relaciones
Category.hasMany(Medication, { foreignKey: "categoryId", sourceKey: "id" });
Medication.belongsTo(Category, { foreignKey: "categoryId", targetKey: "id" });
