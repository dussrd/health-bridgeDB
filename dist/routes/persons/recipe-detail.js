"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipeDetailRoutes = void 0;
const auth_1 = require("../../middleware/auth");
const recipe_detail_controller_1 = require("../../controllers/persons/recipe-detail.controller");
class RecipeDetailRoutes {
    constructor() {
        this.controller = new recipe_detail_controller_1.RecipeDetailController();
    }
    routes(app) {
        app.route("/api/recipe-detail/public")
            .get(this.controller.getAllRecipeDetails)
            .post(this.controller.createRecipeDetail);
        app.route("/api/recipe-detail/public/:id")
            .get(this.controller.getRecipeDetailById)
            .patch(this.controller.updateRecipeDetail)
            .delete(this.controller.deleteRecipeDetail);
        app.route("/api/recipe-detail/public/:id/logic")
            .delete(this.controller.deleteRecipeDetailAdv);
        app.route("/api/recipe-detail")
            .get(auth_1.authMiddleware, this.controller.getAllRecipeDetails)
            .post(auth_1.authMiddleware, this.controller.createRecipeDetail);
        app.route("/api/recipe-detail/:id")
            .get(auth_1.authMiddleware, this.controller.getRecipeDetailById)
            .patch(auth_1.authMiddleware, this.controller.updateRecipeDetail)
            .delete(auth_1.authMiddleware, this.controller.deleteRecipeDetail);
        app.route("/api/recipe-detail/:id/logic")
            .delete(auth_1.authMiddleware, this.controller.deleteRecipeDetailAdv);
    }
}
exports.RecipeDetailRoutes = RecipeDetailRoutes;
