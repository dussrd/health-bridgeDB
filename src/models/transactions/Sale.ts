import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../database/db";
import { SaleDetail } from "./SaleDetail";
import { Payment } from "./Payment";
import { Tax } from "../finances/Tax";

export interface SaleI {
  id?: number;
  customerId: number;
  saleDate: string;
  subtotal: number;
  taxTotal: number;
  total: number;
  status: "ACTIVE" | "CANCELLED";
  taxId?: number;
}

type SaleCreation = Optional<SaleI, "id" | "taxId">;

export class Sale extends Model<SaleI, SaleCreation> implements SaleI {
  public id!: number;
  public customerId!: number;
  public saleDate!: string;
  public subtotal!: number;
  public taxTotal!: number;
  public total!: number;
  public status!: "ACTIVE" | "CANCELLED";
  public taxId?: number;
}

Sale.init(
  {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    customerId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    saleDate: { type: DataTypes.DATE, allowNull: false },
    subtotal: { type: DataTypes.DECIMAL(12,2), allowNull: false, validate: { min: 0 } },
    taxTotal: { type: DataTypes.DECIMAL(12,2), allowNull: false, validate: { min: 0 } },
    total: { type: DataTypes.DECIMAL(12,2), allowNull: false, validate: { min: 0 } },
    status: { type: DataTypes.ENUM("ACTIVE", "CANCELLED"), allowNull: false, defaultValue: "ACTIVE" },
    taxId: { type: DataTypes.INTEGER.UNSIGNED },
  },
  { sequelize, modelName: "Sale", tableName: "sales", timestamps: false }
);

// Relaciones
Sale.hasMany(SaleDetail, { foreignKey: "saleId", sourceKey: "id" });
SaleDetail.belongsTo(Sale, { foreignKey: "saleId", targetKey: "id" });

Sale.hasOne(Payment, { foreignKey: "saleId", sourceKey: "id" });
Payment.belongsTo(Sale, { foreignKey: "saleId", targetKey: "id" });

Tax.hasMany(Sale, { foreignKey: "taxId", sourceKey: "id" });
Sale.belongsTo(Tax, { foreignKey: "taxId", targetKey: "id" });
// (Sale ↔ Customer ya se declaró en Customer.ts)
