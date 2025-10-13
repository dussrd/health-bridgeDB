import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../database/db";
import { Sale } from "../transactions/Sale";
import { Recipe } from "./Recipe";

export type DocumentTypeT = "CC" | "TI" | "CE" | "PP" | "NIT";

export interface CustomerI {
  id?: number;
  username: string;
  password?: string;
  firstName: string;
  lastName: string;
  documentType: DocumentTypeT;
  documentNumber: string;
  phone?: string;
  email?: string;
  address?: string;
  status: "ACTIVE" | "INACTIVE";
}

type CustomerCreation = Optional<CustomerI, "id" | "password" | "phone" | "email" | "address">;

export class Customer extends Model<CustomerI, CustomerCreation> implements CustomerI {
  public id!: number;
  public username!: string;
  public password?: string;
  public firstName!: string;
  public lastName!: string;
  public documentType!: DocumentTypeT;
  public documentNumber!: string;
  public phone?: string;
  public email?: string;
  public address?: string;
  public status!: "ACTIVE" | "INACTIVE";
}

Customer.init(
  {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    username: { type: DataTypes.STRING(64), allowNull: false, unique: true },
    password: { type: DataTypes.STRING(255) },
    firstName: { type: DataTypes.STRING(80), allowNull: false },
    lastName: { type: DataTypes.STRING(80), allowNull: false },
    documentType: { type: DataTypes.ENUM("CC", "TI", "CE", "PP", "NIT"), allowNull: false },
    documentNumber: { type: DataTypes.STRING(40), allowNull: false },
    phone: { type: DataTypes.STRING(32) },
    email: { type: DataTypes.STRING(160), validate: { isEmail: true } },
    address: { type: DataTypes.STRING(255) },
    status: { type: DataTypes.ENUM("ACTIVE", "INACTIVE"), allowNull: false, defaultValue: "ACTIVE" },
  },
  {
    sequelize,
    modelName: "Customer",
    tableName: "customers",
    timestamps: false,
    indexes: [{ unique: true, fields: ["documentType", "documentNumber"] }],
  }
);

// Relaciones
Customer.hasMany(Sale, { foreignKey: "customerId", sourceKey: "id" });
Sale.belongsTo(Customer, { foreignKey: "customerId", targetKey: "id" });

Customer.hasMany(Recipe, { foreignKey: "customerId", sourceKey: "id" });
Recipe.belongsTo(Customer, { foreignKey: "customerId", targetKey: "id" });
