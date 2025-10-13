import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../database/db";
import { Lot } from "./Lot";

export interface SupplierI {
  id?: number;
  name: string;
  contactName?: string;
  phone?: string;
  email?: string;
  address?: string;
  status: "ACTIVE" | "INACTIVE";
}

type SupplierCreation = Optional<SupplierI, "id" | "contactName" | "phone" | "email" | "address">;

export class Supplier extends Model<SupplierI, SupplierCreation> implements SupplierI {
  public id!: number;
  public name!: string;
  public contactName?: string;
  public phone?: string;
  public email?: string;
  public address?: string;
  public status!: "ACTIVE" | "INACTIVE";
}

Supplier.init(
  {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING(120), allowNull: false, unique: true },
    contactName: { type: DataTypes.STRING(120) },
    phone: { type: DataTypes.STRING(32) },
    email: { type: DataTypes.STRING(160), validate: { isEmail: true } },
    address: { type: DataTypes.STRING(255) },
    status: { type: DataTypes.ENUM("ACTIVE", "INACTIVE"), allowNull: false, defaultValue: "ACTIVE" },
  },
  { sequelize, modelName: "Supplier", tableName: "suppliers", timestamps: false }
);

// Relaciones
Supplier.hasMany(Lot, { foreignKey: "supplierId", sourceKey: "id" });
Lot.belongsTo(Supplier, { foreignKey: "supplierId", targetKey: "id" });
