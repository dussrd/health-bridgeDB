// routes/medication.routes.ts
import { Application } from "express";
import { authMiddleware } from "../../middleware/auth";
import { MedicationController } from "../../controllers/inventories/medication.controller";

export class MedicationRoutes {
  public controller = new MedicationController();

  public routes(app: Application): void {
    app.route("/api/medication/public")
      .get(this.controller.getAllMedications)
      .post(this.controller.createMedication);

    app.route("/api/medication/public/:id")
      .get(this.controller.getMedicationById)
      .patch(this.controller.updateMedication)
      .delete(this.controller.deleteMedication);

    app.route("/api/medication/public/:id/logic")
      .delete(this.controller.deleteMedicationAdv);

    app.route("/api/medication")
      .get(authMiddleware, this.controller.getAllMedications)
      .post(authMiddleware, this.controller.createMedication);

    app.route("/api/medication/:id")
      .get(authMiddleware, this.controller.getMedicationById)
      .patch(authMiddleware, this.controller.updateMedication)
      .delete(authMiddleware, this.controller.deleteMedication);

    app.route("/api/medication/:id/logic")
      .delete(authMiddleware, this.controller.deleteMedicationAdv);
  }
}
