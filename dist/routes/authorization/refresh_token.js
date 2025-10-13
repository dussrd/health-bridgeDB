"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshTokenRoutes = void 0;
const refresh_token_controller_1 = require("../../controllers/authorization/refresh_token.controller");
class RefreshTokenRoutes {
    constructor() {
        this.refreshTokenController = new refresh_token_controller_1.RefreshTokenController();
    }
    routes(app) {
        // ================== RUTAS SIN AUTENTICACIÓN ==================
        app.route("/refresk-token")
            .get(this.refreshTokenController.getAllRefreshToken);
        // ================== RUTAS CON AUTENTICACIÓN ==================
        // Si se requieren rutas protegidas, se pueden agregar aquí:
    }
}
exports.RefreshTokenRoutes = RefreshTokenRoutes;
