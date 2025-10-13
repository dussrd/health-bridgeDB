import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../database/db";

export interface LotI {
  id?: number;
  code: string;
  medicationId: number;
  supplierId?: number;
  quantity: number;
  expirationDate: string;
  receivedAt?: string;
  status: "ACTIVE" | "INACTIVE";
}

type LotCreation = Optional<LotI, "id" | "supplierId" | "receivedAt">;

export class Lot extends Model<LotI, LotCreation> implements LotI {
  public id!: number;
  public code!: string;
  public medicationId!: number;
  public supplierId?: number;
  public quantity!: number;
  public expirationDate!: string;
  public receivedAt?: string;
  public status!: "ACTIVE" | "INACTIVE";
}

Lot.init(
  {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    code: { type: DataTypes.STRING(64), allowNull: false },
    medicationId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    supplierId: { type: DataTypes.INTEGER.UNSIGNED },
    quantity: { type: DataTypes.INTEGER, allowNull: false, validate: { min: 1 } },
    expirationDate: { type: DataTypes.DATEONLY, allowNull: false },
    receivedAt: { type: DataTypes.DATE },
    status: { type: DataTypes.ENUM("ACTIVE", "INACTIVE"), allowNull: false, defaultValue: "ACTIVE" },
  },
  {
    sequelize,
    modelName: "Lot",
    tableName: "lots",
    timestamps: false,
    indexes: [{ unique: true, fields: ["code", "medicationId", "supplierId"] }],
  }
);

// Relaciones: ya se establecen en Medication.ts (Medication ↔ Lot) y Supplier.ts (Supplier ↔ Lot)
