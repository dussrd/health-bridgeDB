"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRoutes = void 0;
const auth_1 = require("../../middleware/auth");
const category_controller_1 = require("../../controllers/inventories/category.controller");
class CategoryRoutes {
    constructor() {
        this.controller = new category_controller_1.CategoryController();
    }
    routes(app) {
        app.route("/api/category/public")
            .get(this.controller.getAllCategories)
            .post(this.controller.createCategory);
        app.route("/api/category/public/:id")
            .get(this.controller.getCategoryById)
            .patch(this.controller.updateCategory)
            .delete(this.controller.deleteCategory);
        app.route("/api/category/public/:id/logic")
            .delete(this.controller.deleteCategoryAdv);
        app.route("/api/category")
            .get(auth_1.authMiddleware, this.controller.getAllCategories)
            .post(auth_1.authMiddleware, this.controller.createCategory);
        app.route("/api/category/:id")
            .get(auth_1.authMiddleware, this.controller.getCategoryById)
            .patch(auth_1.authMiddleware, this.controller.updateCategory)
            .delete(auth_1.authMiddleware, this.controller.deleteCategory);
        app.route("/api/category/:id/logic")
            .delete(auth_1.authMiddleware, this.controller.deleteCategoryAdv);
    }
}
exports.CategoryRoutes = CategoryRoutes;
