import { Request, Response } from "express";
import { Lot, LotI } from "../../models/inventories/Lot";

export class LotController {
  public async getAllLots(req: Request, res: Response) {
    try {
      const lots: LotI[] = await Lot.findAll({ where: { status: "ACTIVE" } });
      res.status(200).json({ lots });
    } catch {
      res.status(500).json({ error: "Error fetching lots" });
    }
  }

  public async getLotById(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const lot = await Lot.findOne({ where: { id: pk, status: "ACTIVE" } });
      lot ? res.status(200).json({ lot }) : res.status(404).json({ error: "Lot not found or inactive" });
    } catch {
      res.status(500).json({ error: "Error fetching lot" });
    }
  }

  public async createLot(req: Request, res: Response) {
    const { code, medicationId, supplierId, quantity, expirationDate, receivedAt, status }: LotI = req.body;
    try {
      const newLot = await Lot.create({ code, medicationId, supplierId, quantity, expirationDate, receivedAt, status });
      res.status(201).json(newLot);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  public async updateLot(req: Request, res: Response) {
    const { id: pk } = req.params;
    const { code, medicationId, supplierId, quantity, expirationDate, receivedAt, status }: LotI = req.body;
    try {
      const exists = await Lot.findOne({ where: { id: pk, status: "ACTIVE" } });
      if (!exists) return res.status(404).json({ error: "Lot not found or inactive" });
      await exists.update({ code, medicationId, supplierId, quantity, expirationDate, receivedAt, status });
      res.status(200).json(exists);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  public async deleteLot(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const toDelete = await Lot.findByPk(id);
      if (!toDelete) return res.status(404).json({ error: "Lot not found" });
      await toDelete.destroy();
      res.status(200).json({ message: "Lot deleted successfully" });
    } catch {
      res.status(500).json({ error: "Error deleting lot" });
    }
  }

  public async deleteLotAdv(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const toUpdate = await Lot.findOne({ where: { id: pk, status: "ACTIVE" } });
      if (!toUpdate) return res.status(404).json({ error: "Lot not found" });
      await toUpdate.update({ status: "INACTIVE" });
      res.status(200).json({ message: "Lot marked as inactive" });
    } catch {
      res.status(500).json({ error: "Error marking lot as inactive" });
    }
  }
}
