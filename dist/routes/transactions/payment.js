"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentRoutes = void 0;
const auth_1 = require("../../middleware/auth");
const payment_controller_1 = require("../../controllers/transactions/payment.controller");
class PaymentRoutes {
    constructor() {
        this.controller = new payment_controller_1.PaymentController();
    }
    routes(app) {
        app.route("/api/payment/public")
            .get(this.controller.getAllPayments)
            .post(this.controller.createPayment);
        app.route("/api/payment/public/:id")
            .get(this.controller.getPaymentById)
            .patch(this.controller.updatePayment)
            .delete(this.controller.deletePayment);
        app.route("/api/payment/public/:id/logic")
            .delete(this.controller.deletePaymentAdv);
        app.route("/api/payment")
            .get(auth_1.authMiddleware, this.controller.getAllPayments)
            .post(auth_1.authMiddleware, this.controller.createPayment);
        app.route("/api/payment/:id")
            .get(auth_1.authMiddleware, this.controller.getPaymentById)
            .patch(auth_1.authMiddleware, this.controller.updatePayment)
            .delete(auth_1.authMiddleware, this.controller.deletePayment);
        app.route("/api/payment/:id/logic")
            .delete(auth_1.authMiddleware, this.controller.deletePaymentAdv);
    }
}
exports.PaymentRoutes = PaymentRoutes;
