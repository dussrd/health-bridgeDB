import { Request, Response } from "express";
import { Sale, SaleI } from "../../models/transactions/Sale";

export class SaleController {
  public async getAllSales(req: Request, res: Response) {
  try {
    const status = req.query.status ?? "ACTIVE";

    let where: any = {};

    if (status !== "ALL") {
      where.status = status;
    }

    const sales: SaleI[] = await Sale.findAll({ where });

    res.status(200).json({ sales });
  } catch {
    res.status(500).json({ error: "Error fetching sales" });
  }
}

  public async getSaleById(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const sale = await Sale.findOne({ where: { id: pk, status: "ACTIVE" } });
      sale ? res.status(200).json({ sale }) : res.status(404).json({ error: "Sale not found or cancelled" });
    } catch {
      res.status(500).json({ error: "Error fetching sale" });
    }
  }

  public async createSale(req: Request, res: Response) {
    const { customerId, saleDate, subtotal, taxTotal, total, status, taxId }: SaleI = req.body;
    try {
      const newSale = await Sale.create({ customerId, saleDate, subtotal, taxTotal, total, status, taxId });
      res.status(201).json(newSale);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  public async updateSale(req: Request, res: Response) {
    const { id: pk } = req.params;
    const { customerId, saleDate, subtotal, taxTotal, total, status, taxId }: SaleI = req.body;
    try {
      const exists = await Sale.findOne({ where: { id: pk, status: "ACTIVE" } });
      if (!exists) return res.status(404).json({ error: "Sale not found or cancelled" });
      await exists.update({ customerId, saleDate, subtotal, taxTotal, total, status, taxId });
      res.status(200).json(exists);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  public async deleteSale(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const toDelete = await Sale.findByPk(id);
      if (!toDelete) return res.status(404).json({ error: "Sale not found" });
      await toDelete.destroy();
      res.status(200).json({ message: "Sale deleted successfully" });
    } catch {
      res.status(500).json({ error: "Error deleting sale" });
    }
  }

  public async deleteSaleAdv(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const toUpdate = await Sale.findOne({ where: { id: pk, status: "ACTIVE" } });
      if (!toUpdate) return res.status(404).json({ error: "Sale not found" });
      await toUpdate.update({ status: "CANCELLED" });
      res.status(200).json({ message: "Sale marked as cancelled" });
    } catch {
      res.status(500).json({ error: "Error marking sale as cancelled" });
    }
  }
}
