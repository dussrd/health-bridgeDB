import { Request, Response } from "express";
import { Customer, CustomerI } from "../../models/persons/Customer";

export class CustomerController {
  public async getAllCustomers(req: Request, res: Response) {
    try {
      // Leer query param ?status=ALL | ACTIVE | INACTIVE
      const statusParam = (req.query.status as string | undefined) ?? "ACTIVE";

      let where: any = {};

      if (statusParam === "ALL") {
        // no filtramos por status: trae ACTIVE + INACTIVE
      } else if (statusParam === "INACTIVE") {
        where.status = "INACTIVE";
      } else {
        // por defecto ACTIVE
        where.status = "ACTIVE";
      }

      const customers: CustomerI[] = await Customer.findAll({ where });
      res.status(200).json({ customers });
    } catch {
      res.status(500).json({ error: "Error fetching customers" });
    }
  }

  public async getCustomerById(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      // Aquí seguimos permitiendo SOLO ACTIVE (para no editar inactivos)
      const customer = await Customer.findOne({ where: { id: pk, status: "ACTIVE" } });
      customer
        ? res.status(200).json({ customer })
        : res.status(404).json({ error: "Customer not found or inactive" });
    } catch {
      res.status(500).json({ error: "Error fetching customer" });
    }
  }

  public async createCustomer(req: Request, res: Response) {
    const {
      username, password, firstName, lastName,
      documentType, documentNumber, phone, email, address, status
    }: CustomerI = req.body;

    try {
      const newCustomer = await Customer.create({
        username, password, firstName, lastName,
        documentType, documentNumber, phone, email, address, status
      });

      // Evitar devolver password al front
      const { password: _pass, ...safe } = newCustomer.get();
      res.status(201).json(safe);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  public async updateCustomer(req: Request, res: Response) {
    const { id: pk } = req.params;
    const {
      username, password, firstName, lastName,
      documentType, documentNumber, phone, email, address, status
    }: CustomerI = req.body;

    try {
      // Sólo se puede actualizar si está ACTIVE
      const exists = await Customer.findOne({ where: { id: pk, status: "ACTIVE" } });
      if (!exists) return res.status(404).json({ error: "Customer not found or inactive" });

      await exists.update({
        username, password, firstName, lastName,
        documentType, documentNumber, phone, email, address, status
      });

      const { password: _pass, ...safe } = exists.get();
      res.status(200).json(safe);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  public async deleteCustomer(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const toDelete = await Customer.findByPk(id);
      if (!toDelete) return res.status(404).json({ error: "Customer not found" });

      await toDelete.destroy();
      res.status(200).json({ message: "Customer deleted successfully" });
    } catch {
      res.status(500).json({ error: "Error deleting customer" });
    }
  }

  public async deleteCustomerAdv(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const toUpdate = await Customer.findOne({ where: { id: pk, status: "ACTIVE" } });
      if (!toUpdate) return res.status(404).json({ error: "Customer not found" });

      await toUpdate.update({ status: "INACTIVE" });
      res.status(200).json({ message: "Customer marked as inactive" });
    } catch {
      res.status(500).json({ error: "Error marking customer as inactive" });
    }
  }
}
