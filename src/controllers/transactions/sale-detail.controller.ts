import { Request, Response } from "express";
import { SaleDetail, SaleDetailI } from "../../models/transactions/SaleDetail";

export class SaleDetailController {
  public async getAllSaleDetails(req: Request, res: Response) {
    try {
      const details: SaleDetailI[] = await SaleDetail.findAll();
      res.status(200).json({ details });
    } catch {
      res.status(500).json({ error: "Error fetching sale details" });
    }
  }

  public async getSaleDetailById(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const detail = await SaleDetail.findByPk(pk);
      detail ? res.status(200).json({ detail }) : res.status(404).json({ error: "Sale detail not found" });
    } catch {
      res.status(500).json({ error: "Error fetching sale detail" });
    }
  }

  public async createSaleDetail(req: Request, res: Response) {
    const { saleId, medicationId, quantity, unitPrice, discount }: SaleDetailI = req.body;
    try {
      const newDetail = await SaleDetail.create({ saleId, medicationId, quantity, unitPrice, discount });
      res.status(201).json(newDetail);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  public async updateSaleDetail(req: Request, res: Response) {
    const { id: pk } = req.params;
    const { saleId, medicationId, quantity, unitPrice, discount }: SaleDetailI = req.body;
    try {
      const exists = await SaleDetail.findByPk(pk);
      if (!exists) return res.status(404).json({ error: "Sale detail not found" });
      await exists.update({ saleId, medicationId, quantity, unitPrice, discount });
      res.status(200).json(exists);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  public async deleteSaleDetail(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const toDelete = await SaleDetail.findByPk(id);
      if (!toDelete) return res.status(404).json({ error: "Sale detail not found" });
      await toDelete.destroy();
      res.status(200).json({ message: "Sale detail deleted successfully" });
    } catch {
      res.status(500).json({ error: "Error deleting sale detail" });
    }
  }

  public async deleteSaleDetailAdv(req: Request, res: Response) {
    // No status field -> soft delete not supported
    res.status(400).json({ error: "Logical delete not supported for SaleDetail" });
  }
}
