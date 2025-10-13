"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const auth_controller_1 = require("../../controllers/authorization/auth.controller");
class AuthRoutes {
    constructor() {
        this.authController = new auth_controller_1.AuthController();
    }
    routes(app) {
        // ================== RUTAS SIN AUTENTICACIÓN ==================
        app.route("/api/register")
            .post(this.authController.register);
        app.route("/api/login")
            .post(this.authController.login);
        // ================== RUTAS CON AUTENTICACIÓN ==================
    }
}
exports.AuthRoutes = AuthRoutes;
