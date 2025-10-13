"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerRoutes = void 0;
const auth_1 = require("../../middleware/auth");
const customer_controller_1 = require("../../controllers/persons/customer.controller");
class CustomerRoutes {
    constructor() {
        this.controller = new customer_controller_1.CustomerController();
    }
    routes(app) {
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
            .get(auth_1.authMiddleware, this.controller.getAllCustomers)
            .post(auth_1.authMiddleware, this.controller.createCustomer);
        app.route("/api/customer/:id")
            .get(auth_1.authMiddleware, this.controller.getCustomerById)
            .patch(auth_1.authMiddleware, this.controller.updateCustomer)
            .delete(auth_1.authMiddleware, this.controller.deleteCustomer);
        app.route("/api/customer/:id/logic")
            .delete(auth_1.authMiddleware, this.controller.deleteCustomerAdv);
    }
}
exports.CustomerRoutes = CustomerRoutes;
