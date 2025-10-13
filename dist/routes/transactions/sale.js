"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaleRoutes = void 0;
const auth_1 = require("../../middleware/auth");
const sale_controller_1 = require("../../controllers/transactions/sale.controller");
class SaleRoutes {
    constructor() {
        this.controller = new sale_controller_1.SaleController();
    }
    routes(app) {
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
            .get(auth_1.authMiddleware, this.controller.getAllSales)
            .post(auth_1.authMiddleware, this.controller.createSale);
        app.route("/api/sale/:id")
            .get(auth_1.authMiddleware, this.controller.getSaleById)
            .patch(auth_1.authMiddleware, this.controller.updateSale)
            .delete(auth_1.authMiddleware, this.controller.deleteSale);
        app.route("/api/sale/:id/logic")
            .delete(auth_1.authMiddleware, this.controller.deleteSaleAdv);
    }
}
exports.SaleRoutes = SaleRoutes;
