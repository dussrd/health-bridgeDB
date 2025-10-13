// routes/sale-detail.routes.ts
import { Application } from "express";
import { authMiddleware } from "../../middleware/auth";
import { SaleDetailController } from "../../controllers/transactions/sale-detail.controller";

export class SaleDetailRoutes {
  public controller = new SaleDetailController();

  public routes(app: Application): void {
    app.route("/api/sale-detail/public")
      .get(this.controller.getAllSaleDetails)
      .post(this.controller.createSaleDetail);

    app.route("/api/sale-detail/public/:id")
      .get(this.controller.getSaleDetailById)
      .patch(this.controller.updateSaleDetail)
      .delete(this.controller.deleteSaleDetail);

    app.route("/api/sale-detail/public/:id/logic")
      .delete(this.controller.deleteSaleDetailAdv);

    app.route("/api/sale-detail")
      .get(authMiddleware, this.controller.getAllSaleDetails)
      .post(authMiddleware, this.controller.createSaleDetail);

    app.route("/api/sale-detail/:id")
      .get(authMiddleware, this.controller.getSaleDetailById)
      .patch(authMiddleware, this.controller.updateSaleDetail)
      .delete(authMiddleware, this.controller.deleteSaleDetail);

    app.route("/api/sale-detail/:id/logic")
      .delete(authMiddleware, this.controller.deleteSaleDetailAdv);
  }
}
