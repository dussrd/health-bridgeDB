// routes/customer.routes.ts
import { Application } from "express";
import { authMiddleware } from "../../middleware/auth";
import { CustomerController } from "../../controllers/persons/customer.controller";

export class CustomerRoutes {
  public controller = new CustomerController();

  public routes(app: Application): void {
    app.route("/api/customer/public")
      .get(this.controller.getAllCustomers)
      .post(this.controller.createCustomer);

    app.route("/api/customer/public/:id")
      .get(this.controller.getCustomerById)
      .patch(this.controller.updateCustomer)
      .delete(this.controller.deleteCustomer);

    app.route("/api/customer/public/:id/logic")
      .delete(this.controller.deleteCustomerAdv);

    app.route("/api/customer")
      .get(authMiddleware, this.controller.getAllCustomers)
      .post(authMiddleware, this.controller.createCustomer);

    app.route("/api/customer/:id")
      .get(authMiddleware, this.controller.getCustomerById)
      .patch(authMiddleware, this.controller.updateCustomer)
      .delete(authMiddleware, this.controller.deleteCustomer);

    app.route("/api/customer/:id/logic")
      .delete(authMiddleware, this.controller.deleteCustomerAdv);
  }
}
