import { Request, Response } from "express";
import { Supplier } from "../../models/inventories/Supplier";
import { Lot } from "../../models/inventories/Lot";

export class SupplierController {
  async getAllSuppliers(req: Request, res: Response) {
    try {
      const status = req.query.status;

      const where =
        status === "ALL"
          ? {} // trae activos + inactivos
          : { status: "ACTIVE" };

      const suppliers = await Supplier.findAll({
        where,
        include: [
          {
            model: Lot,
            attributes: { exclude: ["status"] },
          },
        ],
      });

      res.status(200).json({ suppliers });
    } catch (err) {
      res.status(500).json({ error: "Error fetching suppliers" });
    }
  }

  async getSupplierById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const supplier = await Supplier.findOne({
        where: { id, status: "ACTIVE" },
        include: [
          {
            model: Lot,
            attributes: { exclude: ["status"] },
          },
        ],
      });

      if (!supplier)
        return res.status(404).json({ error: "Supplier not found or inactive" });

      res.status(200).json({ supplier });
    } catch {
      res.status(500).json({ error: "Error fetching supplier" });
    }
  }

  async createSupplier(req: Request, res: Response) {
    const { name, contactName, phone, email, address, status } = req.body;

    try {
      const newSupplier = await Supplier.create({
        name,
        contactName,
        phone,
        email,
        address,
        status,
      });

      res.status(201).json(newSupplier);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async updateSupplier(req: Request, res: Response) {
    const { id } = req.params;
    const { name, contactName, phone, email, address, status } = req.body;

    try {
      const supplier = await Supplier.findOne({
        where: { id, status: "ACTIVE" },
      });

      if (!supplier)
        return res.status(404).json({ error: "Supplier not found or inactive" });

      await supplier.update({
        name,
        contactName,
        phone,
        email,
        address,
        status,
      });

      res.status(200).json(supplier);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async deleteSupplier(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const supplier = await Supplier.findByPk(id);

      if (!supplier)
        return res.status(404).json({ error: "Supplier not found" });

      await supplier.destroy();

      res.status(200).json({ message: "Supplier deleted successfully" });
    } catch {
      res.status(500).json({ error: "Error deleting supplier" });
    }
  }

  async deleteSupplierAdv(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const supplier = await Supplier.findOne({
        where: { id, status: "ACTIVE" },
      });

      if (!supplier)
        return res.status(404).json({ error: "Supplier not found" });

      await supplier.update({ status: "INACTIVE" });

      res.status(200).json({ message: "Supplier marked as inactive" });
    } catch {
      res.status(500).json({ error: "Error marking supplier as inactive" });
    }
  }
}
