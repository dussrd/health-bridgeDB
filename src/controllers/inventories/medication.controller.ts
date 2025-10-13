import { Request, Response } from "express";
import { Medication, MedicationI } from "../../models/inventories/Medication";

export class MedicationController {
  public async getAllMedications(req: Request, res: Response) {
    try {
      const medications: MedicationI[] = await Medication.findAll({ where: { status: "AVAILABLE" } });
      res.status(200).json({ medications });
    } catch {
      res.status(500).json({ error: "Error fetching medications" });
    }
  }

  public async getMedicationById(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const medication = await Medication.findOne({ where: { id: pk, status: "AVAILABLE" } });
      medication ? res.status(200).json({ medication }) : res.status(404).json({ error: "Medication not found or unavailable" });
    } catch {
      res.status(500).json({ error: "Error fetching medication" });
    }
  }

  public async createMedication(req: Request, res: Response) {
    const { name, description, unit, price, stock, categoryId, status }: MedicationI = req.body;
    try {
      const newMedication = await Medication.create({ name, description, unit, price, stock, categoryId, status });
      res.status(201).json(newMedication);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  public async updateMedication(req: Request, res: Response) {
    const { id: pk } = req.params;
    const { name, description, unit, price, stock, categoryId, status }: MedicationI = req.body;
    try {
      const exists = await Medication.findOne({ where: { id: pk, status: "AVAILABLE" } });
      if (!exists) return res.status(404).json({ error: "Medication not found or unavailable" });
      await exists.update({ name, description, unit, price, stock, categoryId, status });
      res.status(200).json(exists);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  public async deleteMedication(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const toDelete = await Medication.findByPk(id);
      if (!toDelete) return res.status(404).json({ error: "Medication not found" });
      await toDelete.destroy();
      res.status(200).json({ message: "Medication deleted successfully" });
    } catch {
      res.status(500).json({ error: "Error deleting medication" });
    }
  }

  public async deleteMedicationAdv(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const toUpdate = await Medication.findOne({ where: { id: pk, status: "AVAILABLE" } });
      if (!toUpdate) return res.status(404).json({ error: "Medication not found" });
      await toUpdate.update({ status: "UNAVAILABLE" });
      res.status(200).json({ message: "Medication marked as unavailable" });
    } catch {
      res.status(500).json({ error: "Error marking medication as unavailable" });
    }
  }
}
