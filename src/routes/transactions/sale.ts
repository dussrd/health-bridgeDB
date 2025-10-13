// routes/sale.routes.ts
import { Application } from "express";
import { authMiddleware } from "../../middleware/auth";
import { SaleController } from "../../controllers/transactions/sale.controller";

export class SaleRoutes {
  public controller = new SaleController();

  public routes(app: Application): void {
    app.route("/api/sale/public")
      .get(this.controller.getAllSales)
      .post(this.controller.createSale);

    app.route("/api/sale/public/:id")
      .get(this.controller.getSaleById)
      .patch(this.controller.updateSale)
      .delete(this.controller.deleteSale);

    app.route("/api/sale/public/:id/logic")
      .delete(this.controller.deleteSaleAdv);

    app.route("/api/sale")
      .get(authMiddleware, this.controller.getAllSales)
      .post(authMiddleware, this.controller.createSale);

    app.route("/api/sale/:id")
      .get(authMiddleware, this.controller.getSaleById)
      .patch(authMiddleware, this.controller.updateSale)
      .delete(authMiddleware, this.controller.deleteSale);

    app.route("/api/sale/:id/logic")
      .delete(authMiddleware, this.controller.deleteSaleAdv);
  }
}
