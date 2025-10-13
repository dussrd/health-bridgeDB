// routes/payment.routes.ts
import { Application } from "express";
import { authMiddleware } from "../../middleware/auth";
import { PaymentController } from "../../controllers/transactions/payment.controller";

export class PaymentRoutes {
  public controller = new PaymentController();

  public routes(app: Application): void {
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
      .get(authMiddleware, this.controller.getAllPayments)
      .post(authMiddleware, this.controller.createPayment);

    app.route("/api/payment/:id")
      .get(authMiddleware, this.controller.getPaymentById)
      .patch(authMiddleware, this.controller.updatePayment)
      .delete(authMiddleware, this.controller.deletePayment);

    app.route("/api/payment/:id/logic")
      .delete(authMiddleware, this.controller.deletePaymentAdv);
  }
}
