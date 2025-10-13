import { Request, Response } from "express";
import { Supplier, SupplierI } from "../../models/inventories/Supplier";

export class SupplierController {
  public async getAllSuppliers(req: Request, res: Response) {
    try {
      const suppliers: SupplierI[] = await Supplier.findAll({ where: { status: "ACTIVE" } });
      res.status(200).json({ suppliers });
    } catch {
      res.status(500).json({ error: "Error fetching suppliers" });
    }
  }

  public async getSupplierById(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const supplier = await Supplier.findOne({ where: { id: pk, status: "ACTIVE" } });
      supplier ? res.status(200).json({ supplier }) : res.status(404).json({ error: "Supplier not found or inactive" });
    } catch {
      res.status(500).json({ error: "Error fetching supplier" });
    }
  }

  public async createSupplier(req: Request, res: Response) {
    const { name, contactName, phone, email, address, status }: SupplierI = req.body;
    try {
      const newSupplier = await Supplier.create({ name, contactName, phone, email, address, status });
      res.status(201).json(newSupplier);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  public async updateSupplier(req: Request, res: Response) {
    const { id: pk } = req.params;
    const { name, contactName, phone, email, address, status }: SupplierI = req.body;
    try {
      const exists = await Supplier.findOne({ where: { id: pk, status: "ACTIVE" } });
      if (!exists) return res.status(404).json({ error: "Supplier not found or inactive" });
      await exists.update({ name, contactName, phone, email, address, status });
      res.status(200).json(exists);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  public async deleteSupplier(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const toDelete = await Supplier.findByPk(id);
      if (!toDelete) return res.status(404).json({ error: "Supplier not found" });
      await toDelete.destroy();
      res.status(200).json({ message: "Supplier deleted successfully" });
    } catch {
      res.status(500).json({ error: "Error deleting supplier" });
    }
  }

  public async deleteSupplierAdv(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const toUpdate = await Supplier.findOne({ where: { id: pk, status: "ACTIVE" } });
      if (!toUpdate) return res.status(404).json({ error: "Supplier not found" });
      await toUpdate.update({ status: "INACTIVE" });
      res.status(200).json({ message: "Supplier marked as inactive" });
    } catch {
      res.status(500).json({ error: "Error marking supplier as inactive" });
    }
  }
}
