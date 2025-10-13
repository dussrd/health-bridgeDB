"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipeRoutes = void 0;
const auth_1 = require("../../middleware/auth");
const recipe_controller_1 = require("../../controllers/persons/recipe.controller");
class RecipeRoutes {
    constructor() {
        this.controller = new recipe_controller_1.RecipeController();
    }
    routes(app) {
        app.route("/api/recipe/public")
            .get(this.controller.getAllRecipes)
            .post(this.controller.createRecipe);
        app.route("/api/recipe/public/:id")
            .get(this.controller.getRecipeById)
            .patch(this.controller.updateRecipe)
            .delete(this.controller.deleteRecipe);
        app.route("/api/recipe/public/:id/logic")
            .delete(this.controller.deleteRecipeAdv);
        app.route("/api/recipe")
            .get(auth_1.authMiddleware, this.controller.getAllRecipes)
            .post(auth_1.authMiddleware, this.controller.createRecipe);
        app.route("/api/recipe/:id")
            .get(auth_1.authMiddleware, this.controller.getRecipeById)
            .patch(auth_1.authMiddleware, this.controller.updateRecipe)
            .delete(auth_1.authMiddleware, this.controller.deleteRecipe);
        app.route("/api/recipe/:id/logic")
            .delete(auth_1.authMiddleware, this.controller.deleteRecipeAdv);
    }
}
exports.RecipeRoutes = RecipeRoutes;
