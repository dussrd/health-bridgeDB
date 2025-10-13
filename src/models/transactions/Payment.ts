import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../database/db";

export type PaymentMethodT = "CASH" | "CARD" | "TRANSFER" | "OTHER";
export type PaymentStatusT = "PENDING" | "PAID" | "REFUNDED";

export interface PaymentI {
  id?: number;
  saleId: number;
  amount: number;
  method: PaymentMethodT;
  paidAt?: string;
  status: PaymentStatusT;
  reference?: string;
}

type PaymentCreation = Optional<PaymentI, "id" | "paidAt" | "reference">;

export class Payment extends Model<PaymentI, PaymentCreation> implements PaymentI {
  public id!: number;
  public saleId!: number;
  public amount!: number;
  public method!: PaymentMethodT;
  public paidAt?: string;
  public status!: PaymentStatusT;
  public reference?: string;
}

Payment.init(
  {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    saleId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false, unique: true },
    amount: { type: DataTypes.DECIMAL(12,2), allowNull: false, validate: { min: 0 } },
    method: { type: DataTypes.ENUM("CASH", "CARD", "TRANSFER", "OTHER"), allowNull: false },
    paidAt: { type: DataTypes.DATE },
    status: { type: DataTypes.ENUM("PENDING", "PAID", "REFUNDED"), allowNull: false, defaultValue: "PENDING" },
    reference: { type: DataTypes.STRING(120) },
  },
  { sequelize, modelName: "Payment", tableName: "payments", timestamps: false }
);

// Relaciones: ya se establecen en Sale.ts (Sale ↔ Payment)
