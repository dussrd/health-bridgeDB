"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LotRoutes = void 0;
const auth_1 = require("../../middleware/auth");
const lot_controller_1 = require("../../controllers/inventories/lot.controller");
class LotRoutes {
    constructor() {
        this.controller = new lot_controller_1.LotController();
    }
    routes(app) {
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
            .get(auth_1.authMiddleware, this.controller.getAllLots)
            .post(auth_1.authMiddleware, this.controller.createLot);
        app.route("/api/lot/:id")
            .get(auth_1.authMiddleware, this.controller.getLotById)
            .patch(auth_1.authMiddleware, this.controller.updateLot)
            .delete(auth_1.authMiddleware, this.controller.deleteLot);
        app.route("/api/lot/:id/logic")
            .delete(auth_1.authMiddleware, this.controller.deleteLotAdv);
    }
}
exports.LotRoutes = LotRoutes;
