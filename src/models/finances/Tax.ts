import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../database/db";

export interface TaxI {
  id?: number;
  name: string;
  rate: number;
  status: "ACTIVE" | "INACTIVE";
}

type TaxCreation = Optional<TaxI, "id">;

export class Tax extends Model<TaxI, TaxCreation> implements TaxI {
  public id!: number;
  public name!: string;
  public rate!: number;
  public status!: "ACTIVE" | "INACTIVE";
}

Tax.init(
  {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING(64), allowNull: false, unique: true },
    rate: { type: DataTypes.DECIMAL(6,4), allowNull: false, validate: { min: 0, max: 1 } },
    status: { type: DataTypes.ENUM("ACTIVE", "INACTIVE"), allowNull: false, defaultValue: "ACTIVE" },
  },
  { sequelize, modelName: "Tax", tableName: "taxes", timestamps: false }
);

// Relaciones con Sale: definidas en models/transactions/Sale.ts
