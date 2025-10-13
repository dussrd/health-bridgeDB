// routes/recipe.routes.ts
import { Application } from "express";
import { authMiddleware } from "../../middleware/auth";
import { RecipeController } from "../../controllers/persons/recipe.controller";

export class RecipeRoutes {
  public controller = new RecipeController();

  public routes(app: Application): void {
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
      .get(authMiddleware, this.controller.getAllRecipes)
      .post(authMiddleware, this.controller.createRecipe);

    app.route("/api/recipe/:id")
      .get(authMiddleware, this.controller.getRecipeById)
      .patch(authMiddleware, this.controller.updateRecipe)
      .delete(authMiddleware, this.controller.deleteRecipe);

    app.route("/api/recipe/:id/logic")
      .delete(authMiddleware, this.controller.deleteRecipeAdv);
  }
}
