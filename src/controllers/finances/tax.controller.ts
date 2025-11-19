import { Request, Response } from "express";
import { Tax, TaxI } from "../../models/finances/Tax";

export class TaxController {
  public async getAllTaxes(req: Request, res: Response) {
    try {
      const { status } = req.query as { status?: string };

      // Armamos el "where" dinámico
      const where: any = {};

      if (!status || status === "ACTIVE") {
        // por defecto solo activos (comportamiento anterior)
        where.status = "ACTIVE";
      } else if (status === "INACTIVE") {
        where.status = "INACTIVE";
      }
      // si status === "ALL", no ponemos filtro de status

      const taxes: TaxI[] = await Tax.findAll({ where });
      res.status(200).json({ taxes });
    } catch (error) {
      console.error("Error fetching taxes", error);
      res.status(500).json({ error: "Error fetching taxes" });
    }
  }

  public async getTaxById(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const tax = await Tax.findOne({ where: { id: pk, status: "ACTIVE" } });
      tax ? res.status(200).json({ tax }) : res.status(404).json({ error: "Tax not found or inactive" });
    } catch {
      res.status(500).json({ error: "Error fetching tax" });
    }
  }

  public async createTax(req: Request, res: Response) {
    const { name, rate, status }: TaxI = req.body;
    try {
      const newTax = await Tax.create({ name, rate, status });
      res.status(201).json(newTax);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  public async updateTax(req: Request, res: Response) {
    const { id: pk } = req.params;
    const { name, rate, status }: TaxI = req.body;
    try {
      const exists = await Tax.findOne({ where: { id: pk, status: "ACTIVE" } });
      if (!exists) return res.status(404).json({ error: "Tax not found or inactive" });
      await exists.update({ name, rate, status });
      res.status(200).json(exists);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  public async deleteTax(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const toDelete = await Tax.findByPk(id);
      if (!toDelete) return res.status(404).json({ error: "Tax not found" });
      await toDelete.destroy();
      res.status(200).json({ message: "Tax deleted successfully" });
    } catch {
      res.status(500).json({ error: "Error deleting tax" });
    }
  }

  public async deleteTaxAdv(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const toUpdate = await Tax.findOne({ where: { id: pk, status: "ACTIVE" } });
      if (!toUpdate) return res.status(404).json({ error: "Tax not found" });
      await toUpdate.update({ status: "INACTIVE" });
      res.status(200).json({ message: "Tax marked as inactive" });
    } catch {
      res.status(500).json({ error: "Error marking tax as inactive" });
    }
  }
}
