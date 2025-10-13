// routes/recipe-detail.routes.ts
import { Application } from "express";
import { authMiddleware } from "../../middleware/auth";
import { RecipeDetailController } from "../../controllers/persons/recipe-detail.controller";

export class RecipeDetailRoutes {
  public controller = new RecipeDetailController();

  public routes(app: Application): void {
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
      .get(authMiddleware, this.controller.getAllRecipeDetails)
      .post(authMiddleware, this.controller.createRecipeDetail);

    app.route("/api/recipe-detail/:id")
      .get(authMiddleware, this.controller.getRecipeDetailById)
      .patch(authMiddleware, this.controller.updateRecipeDetail)
      .delete(authMiddleware, this.controller.deleteRecipeDetail);

    app.route("/api/recipe-detail/:id/logic")
      .delete(authMiddleware, this.controller.deleteRecipeDetailAdv);
  }
}
