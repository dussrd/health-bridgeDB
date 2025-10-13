import { Router } from "express";
import { TaxRoutes } from "./finances/tax";
import { CategoryRoutes } from "./inventories/category";
import { LotRoutes } from "./inventories/lot";
import { MedicationRoutes } from "./inventories/medication";
import { SupplierRoutes } from "./inventories/supplier";
import { CustomerRoutes } from "./persons/customer";
import { RecipeDetailRoutes } from "./persons/recipe-detail";
import { RecipeRoutes } from "./persons/recipe";
import { PaymentRoutes } from "./transactions/payment";
import { SaleDetailRoutes } from "./transactions/sale-detail";
import { SaleRoutes } from "./transactions/sale";
import { RefreshTokenRoutes } from "./authorization/refresh_token";
import { ResourceRoutes } from "./authorization/resource";
import { ResourceRoleRoutes } from "./authorization/resourceRole";
import { RoleRoutes } from "./authorization/role";
import { RoleUserRoutes } from "./authorization/role_user";
import { UserRoutes } from "./authorization/user";
import { AuthRoutes } from "./authorization/auth";

export class Routes {
  public taxRoutes: TaxRoutes = new TaxRoutes();
  public categoryRoutes: CategoryRoutes = new CategoryRoutes();
  public lotRoutes: LotRoutes = new LotRoutes();
  public medicationRoutes: MedicationRoutes = new MedicationRoutes();
  public supplierRoutes: SupplierRoutes = new SupplierRoutes();
  public customerRoutes: CustomerRoutes = new CustomerRoutes();
  public recipedetailRoutes: RecipeDetailRoutes = new RecipeDetailRoutes();
  public recipeRoutes: RecipeRoutes = new RecipeRoutes();
  public paymentRoutes: PaymentRoutes = new PaymentRoutes();
  public saledetailRoutes: SaleDetailRoutes = new SaleDetailRoutes();
  public saleRoutes: SaleRoutes = new SaleRoutes();
  public userRoutes: UserRoutes = new UserRoutes();
  public roleRoutes: RoleRoutes = new RoleRoutes();
  public roleUserRoutes: RoleUserRoutes = new RoleUserRoutes();
  public refreshTokenRoutes: RefreshTokenRoutes = new RefreshTokenRoutes();
  public resourceRoutes: ResourceRoutes = new ResourceRoutes(); // Add ResourceRoutes
  public resourceRoleRoutes: ResourceRoleRoutes = new ResourceRoleRoutes();
  public authRoutes: AuthRoutes = new AuthRoutes();
}