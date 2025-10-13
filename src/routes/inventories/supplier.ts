// routes/supplier.routes.ts
import { Application } from "express";
import { authMiddleware } from "../../middleware/auth";
import { SupplierController } from "../../controllers/inventories/supplier.controller";

export class SupplierRoutes {
  public controller = new SupplierController();

  public routes(app: Application): void {
    app.route("/api/supplier/public")
      .get(this.controller.getAllSuppliers)
      .post(this.controller.createSupplier);

    app.route("/api/supplier/public/:id")
      .get(this.controller.getSupplierById)
      .patch(this.controller.updateSupplier)
      .delete(this.controller.deleteSupplier);

    app.route("/api/supplier/public/:id/logic")
      .delete(this.controller.deleteSupplierAdv);

    app.route("/api/supplier")
      .get(authMiddleware, this.controller.getAllSuppliers)
      .post(authMiddleware, this.controller.createSupplier);

    app.route("/api/supplier/:id")
      .get(authMiddleware, this.controller.getSupplierById)
      .patch(authMiddleware, this.controller.updateSupplier)
      .delete(authMiddleware, this.controller.deleteSupplier);

    app.route("/api/supplier/:id/logic")
      .delete(authMiddleware, this.controller.deleteSupplierAdv);
  }
}
