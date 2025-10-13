"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaleDetailRoutes = void 0;
const auth_1 = require("../../middleware/auth");
const sale_detail_controller_1 = require("../../controllers/transactions/sale-detail.controller");
class SaleDetailRoutes {
    constructor() {
        this.controller = new sale_detail_controller_1.SaleDetailController();
    }
    routes(app) {
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
            .get(auth_1.authMiddleware, this.controller.getAllSaleDetails)
            .post(auth_1.authMiddleware, this.controller.createSaleDetail);
        app.route("/api/sale-detail/:id")
            .get(auth_1.authMiddleware, this.controller.getSaleDetailById)
            .patch(auth_1.authMiddleware, this.controller.updateSaleDetail)
            .delete(auth_1.authMiddleware, this.controller.deleteSaleDetail);
        app.route("/api/sale-detail/:id/logic")
            .delete(auth_1.authMiddleware, this.controller.deleteSaleDetailAdv);
    }
}
exports.SaleDetailRoutes = SaleDetailRoutes;
