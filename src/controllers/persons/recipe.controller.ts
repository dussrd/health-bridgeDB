import { Request, Response } from "express";
import { Recipe, RecipeI } from "../../models/persons/Recipe";

export class RecipeController {
  public async getAllRecipes(req: Request, res: Response) {
    try {
      const statusParam = (req.query.status as string | undefined) ?? "VALID";

      let where: any = {};

      if (statusParam === "ALL") {
        // no filtramos por status → trae VALID + EXPIRED
      } else if (statusParam === "EXPIRED") {
        where.status = "EXPIRED";
      } else {
        // por defecto VALID
        where.status = "VALID";
      }

      const recipes: RecipeI[] = await Recipe.findAll({ where });
      res.status(200).json({ recipes });
    } catch {
      res.status(500).json({ error: "Error fetching recipes" });
    }
  }

  public async getRecipeById(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const recipe = await Recipe.findOne({ where: { id: pk, status: "VALID" } });
      recipe
        ? res.status(200).json({ recipe })
        : res.status(404).json({ error: "Recipe not found or expired" });
    } catch {
      res.status(500).json({ error: "Error fetching recipe" });
    }
  }

  public async createRecipe(req: Request, res: Response) {
    const { customerId, issuedAt, notes, status }: RecipeI = req.body;
    try {
      const newRecipe = await Recipe.create({ customerId, issuedAt, notes, status });
      res.status(201).json(newRecipe);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  public async updateRecipe(req: Request, res: Response) {
    const { id: pk } = req.params;
    const { customerId, issuedAt, notes, status }: RecipeI = req.body;
    try {
      const exists = await Recipe.findOne({ where: { id: pk, status: "VALID" } });
      if (!exists) return res.status(404).json({ error: "Recipe not found or expired" });

      await exists.update({ customerId, issuedAt, notes, status });
      res.status(200).json(exists);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  public async deleteRecipe(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const toDelete = await Recipe.findByPk(id);
      if (!toDelete) return res.status(404).json({ error: "Recipe not found" });
      await toDelete.destroy();
      res.status(200).json({ message: "Recipe deleted successfully" });
    } catch {
      res.status(500).json({ error: "Error deleting recipe" });
    }
  }

  public async deleteRecipeAdv(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const toUpdate = await Recipe.findOne({ where: { id: pk, status: "VALID" } });
      if (!toUpdate) return res.status(404).json({ error: "Recipe not found" });
      await toUpdate.update({ status: "EXPIRED" });
      res.status(200).json({ message: "Recipe marked as expired" });
    } catch {
      res.status(500).json({ error: "Error marking recipe as expired" });
    }
  }
}