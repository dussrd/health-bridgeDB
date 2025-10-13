import { Request, Response } from "express";
import { RecipeDetail, RecipeDetailI } from "../../models/persons/RecipeDetail";

export class RecipeDetailController {
  public async getAllRecipeDetails(req: Request, res: Response) {
    try {
      const details: RecipeDetailI[] = await RecipeDetail.findAll();
      res.status(200).json({ details });
    } catch {
      res.status(500).json({ error: "Error fetching recipe details" });
    }
  }

  public async getRecipeDetailById(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const detail = await RecipeDetail.findByPk(pk);
      detail ? res.status(200).json({ detail }) : res.status(404).json({ error: "Recipe detail not found" });
    } catch {
      res.status(500).json({ error: "Error fetching recipe detail" });
    }
  }

  public async createRecipeDetail(req: Request, res: Response) {
    const { recipeId, medicationId, dosage, quantity }: RecipeDetailI = req.body;
    try {
      const newDetail = await RecipeDetail.create({ recipeId, medicationId, dosage, quantity });
      res.status(201).json(newDetail);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  public async updateRecipeDetail(req: Request, res: Response) {
    const { id: pk } = req.params;
    const { recipeId, medicationId, dosage, quantity }: RecipeDetailI = req.body;
    try {
      const exists = await RecipeDetail.findByPk(pk);
      if (!exists) return res.status(404).json({ error: "Recipe detail not found" });
      await exists.update({ recipeId, medicationId, dosage, quantity });
      res.status(200).json(exists);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  public async deleteRecipeDetail(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const toDelete = await RecipeDetail.findByPk(id);
      if (!toDelete) return res.status(404).json({ error: "Recipe detail not found" });
      await toDelete.destroy();
      res.status(200).json({ message: "Recipe detail deleted successfully" });
    } catch {
      res.status(500).json({ error: "Error deleting recipe detail" });
    }
  }

  public async deleteRecipeDetailAdv(req: Request, res: Response) {
    // No status field -> soft delete not supported
    res.status(400).json({ error: "Logical delete not supported for RecipeDetail" });
  }
}
