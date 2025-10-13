// routes/tax.routes.ts
import { Application } from "express";
import { TaxController } from "../../controllers/finances/tax.controller";
import { authMiddleware } from "../../middleware/auth";

export class TaxRoutes {
  public controller = new TaxController();

  public routes(app: Application): void {
    // Public
    app.route("/api/tax/public")
      .get(this.controller.getAllTaxes)
      .post(this.controller.createTax);

    app.route("/api/tax/public/:id")
      .get(this.controller.getTaxById)
      .patch(this.controller.updateTax)
      .delete(this.controller.deleteTax);

    app.route("/api/tax/public/:id/logic")
      .delete(this.controller.deleteTaxAdv);

    // Auth
    app.route("/api/tax")
      .get(authMiddleware, this.controller.getAllTaxes)
      .post(authMiddleware, this.controller.createTax);

    app.route("/api/tax/:id")
      .get(authMiddleware, this.controller.getTaxById)
      .patch(authMiddleware, this.controller.updateTax)
      .delete(authMiddleware, this.controller.deleteTax);

    app.route("/api/tax/:id/logic")
      .delete(authMiddleware, this.controller.deleteTaxAdv);
  }
}
