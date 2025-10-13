import { Request, Response } from "express";
import { Payment, PaymentI } from "../../models/transactions/Payment";

export class PaymentController {
  public async getAllPayments(req: Request, res: Response) {
    try {
      const payments: PaymentI[] = await Payment.findAll();
      res.status(200).json({ payments });
    } catch {
      res.status(500).json({ error: "Error fetching payments" });
    }
  }

  public async getPaymentById(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const payment = await Payment.findByPk(pk);
      payment ? res.status(200).json({ payment }) : res.status(404).json({ error: "Payment not found" });
    } catch {
      res.status(500).json({ error: "Error fetching payment" });
    }
  }

  public async createPayment(req: Request, res: Response) {
    const { saleId, amount, method, paidAt, status, reference }: PaymentI = req.body;
    try {
      const newPayment = await Payment.create({ saleId, amount, method, paidAt, status, reference });
      res.status(201).json(newPayment);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  public async updatePayment(req: Request, res: Response) {
    const { id: pk } = req.params;
    const { saleId, amount, method, paidAt, status, reference }: PaymentI = req.body;
    try {
      const exists = await Payment.findByPk(pk);
      if (!exists) return res.status(404).json({ error: "Payment not found" });
      await exists.update({ saleId, amount, method, paidAt, status, reference });
      res.status(200).json(exists);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  public async deletePayment(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const toDelete = await Payment.findByPk(id);
      if (!toDelete) return res.status(404).json({ error: "Payment not found" });
      await toDelete.destroy();
      res.status(200).json({ message: "Payment deleted successfully" });
    } catch {
      res.status(500).json({ error: "Error deleting payment" });
    }
  }

  public async deletePaymentAdv(req: Request, res: Response) {
    // Payment has no boolean-like status for inactivation (enum is business state, not archival)
    res.status(400).json({ error: "Logical delete not supported for Payment" });
  }
}
