import { Request, Response } from "express";
import { Category, CategoryI } from "../../models/inventories/Category";

export class CategoryController {
  public async getAllCategories(req: Request, res: Response) {
  try {
    const statusParam = String(req.query.status || '').toUpperCase(); // '', 'ALL', 'ACTIVE', 'INACTIVE'
    const where =
      statusParam === 'ALL'
        ? {} // sin filtro: muestra todos
        : { status: 'ACTIVE' }; // comportamiento actual por defecto

    const categories: CategoryI[] = await Category.findAll({ where });
    res.status(200).json({ categories });
  } catch {
    res.status(500).json({ error: "Error fetching categories" });
  }
}

  public async getCategoryById(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const category = await Category.findOne({ where: { id: pk, status: "ACTIVE" } });
      category ? res.status(200).json({ category }) : res.status(404).json({ error: "Category not found or inactive" });
    } catch {
      res.status(500).json({ error: "Error fetching category" });
    }
  }

  public async createCategory(req: Request, res: Response) {
    const { name, description, status }: CategoryI = req.body;
    try {
      const newCategory = await Category.create({ name, description, status });
      res.status(201).json(newCategory);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  public async updateCategory(req: Request, res: Response) {
    const { id: pk } = req.params;
    const { name, description, status }: CategoryI = req.body;
    try {
      const exists = await Category.findOne({ where: { id: pk, status: "ACTIVE" } });
      if (!exists) return res.status(404).json({ error: "Category not found or inactive" });
      await exists.update({ name, description, status });
      res.status(200).json(exists);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  public async deleteCategory(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const toDelete = await Category.findByPk(id);
      if (!toDelete) return res.status(404).json({ error: "Category not found" });
      await toDelete.destroy();
      res.status(200).json({ message: "Category deleted successfully" });
    } catch {
      res.status(500).json({ error: "Error deleting category" });
    }
  }

  public async deleteCategoryAdv(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const toUpdate = await Category.findOne({ where: { id: pk, status: "ACTIVE" } });
      if (!toUpdate) return res.status(404).json({ error: "Category not found" });
      await toUpdate.update({ status: "INACTIVE" });
      res.status(200).json({ message: "Category marked as inactive" });
    } catch {
      res.status(500).json({ error: "Error marking category as inactive" });
    }
  }
}
