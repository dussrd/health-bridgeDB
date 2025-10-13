"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaxRoutes = void 0;
const tax_controller_1 = require("../../controllers/finances/tax.controller");
const auth_1 = require("../../middleware/auth");
class TaxRoutes {
    constructor() {
        this.controller = new tax_controller_1.TaxController();
    }
    routes(app) {
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
            .get(auth_1.authMiddleware, this.controller.getAllTaxes)
            .post(auth_1.authMiddleware, this.controller.createTax);
        app.route("/api/tax/:id")
            .get(auth_1.authMiddleware, this.controller.getTaxById)
            .patch(auth_1.authMiddleware, this.controller.updateTax)
            .delete(auth_1.authMiddleware, this.controller.deleteTax);
        app.route("/api/tax/:id/logic")
            .delete(auth_1.authMiddleware, this.controller.deleteTaxAdv);
    }
}
exports.TaxRoutes = TaxRoutes;
