// routes/lot.routes.ts
import { Application } from "express";
import { authMiddleware } from "../../middleware/auth";
import { LotController } from "../../controllers/inventories/lot.controller";

export class LotRoutes {
  public controller = new LotController();

  public routes(app: Application): void {
    app.route("/api/lot/public")
      .get(this.controller.getAllLots)
      .post(this.controller.createLot);

    app.route("/api/lot/public/:id")
      .get(this.controller.getLotById)
      .patch(this.controller.updateLot)
      .delete(this.controller.deleteLot);

    app.route("/api/lot/public/:id/logic")
      .delete(this.controller.deleteLotAdv);

    app.route("/api/lot")
      .get(authMiddleware, this.controller.getAllLots)
      .post(authMiddleware, this.controller.createLot);

    app.route("/api/lot/:id")
      .get(authMiddleware, this.controller.getLotById)
      .patch(authMiddleware, this.controller.updateLot)
      .delete(authMiddleware, this.controller.deleteLot);

    app.route("/api/lot/:id/logic")
      .delete(authMiddleware, this.controller.deleteLotAdv);
  }
}
