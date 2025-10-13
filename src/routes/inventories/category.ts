// routes/category.routes.ts
import { Application } from "express";
import { authMiddleware } from "../../middleware/auth";
import { CategoryController } from "../../controllers/inventories/category.controller";

export class CategoryRoutes {
  public controller = new CategoryController();

  public routes(app: Application): void {
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
      .get(authMiddleware, this.controller.getAllCategories)
      .post(authMiddleware, this.controller.createCategory);

    app.route("/api/category/:id")
      .get(authMiddleware, this.controller.getCategoryById)
      .patch(authMiddleware, this.controller.updateCategory)
      .delete(authMiddleware, this.controller.deleteCategory);

    app.route("/api/category/:id/logic")
      .delete(authMiddleware, this.controller.deleteCategoryAdv);
  }
}
