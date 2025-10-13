"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupplierRoutes = void 0;
const auth_1 = require("../../middleware/auth");
const supplier_controller_1 = require("../../controllers/inventories/supplier.controller");
class SupplierRoutes {
    constructor() {
        this.controller = new supplier_controller_1.SupplierController();
    }
    routes(app) {
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
            .get(auth_1.authMiddleware, this.controller.getAllSuppliers)
            .post(auth_1.authMiddleware, this.controller.createSupplier);
        app.route("/api/supplier/:id")
            .get(auth_1.authMiddleware, this.controller.getSupplierById)
            .patch(auth_1.authMiddleware, this.controller.updateSupplier)
            .delete(auth_1.authMiddleware, this.controller.deleteSupplier);
        app.route("/api/supplier/:id/logic")
            .delete(auth_1.authMiddleware, this.controller.deleteSupplierAdv);
    }
}
exports.SupplierRoutes = SupplierRoutes;
