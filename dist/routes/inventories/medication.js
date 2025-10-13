"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MedicationRoutes = void 0;
const auth_1 = require("../../middleware/auth");
const medication_controller_1 = require("../../controllers/inventories/medication.controller");
class MedicationRoutes {
    constructor() {
        this.controller = new medication_controller_1.MedicationController();
    }
    routes(app) {
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
            .get(auth_1.authMiddleware, this.controller.getAllMedications)
            .post(auth_1.authMiddleware, this.controller.createMedication);
        app.route("/api/medication/:id")
            .get(auth_1.authMiddleware, this.controller.getMedicationById)
            .patch(auth_1.authMiddleware, this.controller.updateMedication)
            .delete(auth_1.authMiddleware, this.controller.deleteMedication);
        app.route("/api/medication/:id/logic")
            .delete(auth_1.authMiddleware, this.controller.deleteMedicationAdv);
    }
}
exports.MedicationRoutes = MedicationRoutes;
