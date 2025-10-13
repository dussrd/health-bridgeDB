import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../database/db";

export interface SaleDetailI {
  id?: number;
  saleId: number;
  medicationId: number;
  quantity: number;
  unitPrice: number;
  discount?: number;
}

type SaleDetailCreation = Optional<SaleDetailI, "id" | "discount">;

export class SaleDetail extends Model<SaleDetailI, SaleDetailCreation> implements SaleDetailI {
  public id!: number;
  public saleId!: number;
  public medicationId!: number;
  public quantity!: number;
  public unitPrice!: number;
  public discount?: number;
}

SaleDetail.init(
  {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    saleId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    medicationId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    quantity: { type: DataTypes.INTEGER, allowNull: false, validate: { min: 1 } },
    unitPrice: { type: DataTypes.DECIMAL(12,2), allowNull: false, validate: { min: 0 } },
    discount: { type: DataTypes.DECIMAL(12,2), allowNull: true, validate: { min: 0 } },
  },
  { sequelize, modelName: "SaleDetail", tableName: "sale_details", timestamps: false }
);

// Relaciones: ya se establecen en Sale.ts (Sale ↔ SaleDetail) y Medication.ts (Medication ↔ SaleDetail)
