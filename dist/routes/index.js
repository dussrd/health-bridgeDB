"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routes = void 0;
const tax_1 = require("./finances/tax");
const category_1 = require("./inventories/category");
const lot_1 = require("./inventories/lot");
const medication_1 = require("./inventories/medication");
const supplier_1 = require("./inventories/supplier");
const customer_1 = require("./persons/customer");
const recipe_detail_1 = require("./persons/recipe-detail");
const recipe_1 = require("./persons/recipe");
const payment_1 = require("./transactions/payment");
const sale_detail_1 = require("./transactions/sale-detail");
const sale_1 = require("./transactions/sale");
const refresh_token_1 = require("./authorization/refresh_token");
const resource_1 = require("./authorization/resource");
const resourceRole_1 = require("./authorization/resourceRole");
const role_1 = require("./authorization/role");
const role_user_1 = require("./authorization/role_user");
const user_1 = require("./authorization/user");
const auth_1 = require("./authorization/auth");
class Routes {
    constructor() {
        this.taxRoutes = new tax_1.TaxRoutes();
        this.categoryRoutes = new category_1.CategoryRoutes();
        this.lotRoutes = new lot_1.LotRoutes();
        this.medicationRoutes = new medication_1.MedicationRoutes();
        this.supplierRoutes = new supplier_1.SupplierRoutes();
        this.customerRoutes = new customer_1.CustomerRoutes();
        this.recipedetailRoutes = new recipe_detail_1.RecipeDetailRoutes();
        this.recipeRoutes = new recipe_1.RecipeRoutes();
        this.paymentRoutes = new payment_1.PaymentRoutes();
        this.saledetailRoutes = new sale_detail_1.SaleDetailRoutes();
        this.saleRoutes = new sale_1.SaleRoutes();
        this.userRoutes = new user_1.UserRoutes();
        this.roleRoutes = new role_1.RoleRoutes();
        this.roleUserRoutes = new role_user_1.RoleUserRoutes();
        this.refreshTokenRoutes = new refresh_token_1.RefreshTokenRoutes();
        this.resourceRoutes = new resource_1.ResourceRoutes(); // Add ResourceRoutes
        this.resourceRoleRoutes = new resourceRole_1.ResourceRoleRoutes();
        this.authRoutes = new auth_1.AuthRoutes();
    }
}
exports.Routes = Routes;
