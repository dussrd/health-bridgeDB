"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentController = void 0;
const Payment_1 = require("../../models/transactions/Payment");
class PaymentController {
    getAllPayments(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const payments = yield Payment_1.Payment.findAll();
                res.status(200).json({ payments });
            }
            catch (_a) {
                res.status(500).json({ error: "Error fetching payments" });
            }
        });
    }
    getPaymentById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id: pk } = req.params;
                const payment = yield Payment_1.Payment.findByPk(pk);
                payment ? res.status(200).json({ payment }) : res.status(404).json({ error: "Payment not found" });
            }
            catch (_a) {
                res.status(500).json({ error: "Error fetching payment" });
            }
        });
    }
    createPayment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { saleId, amount, method, paidAt, status, reference } = req.body;
            try {
                const newPayment = yield Payment_1.Payment.create({ saleId, amount, method, paidAt, status, reference });
                res.status(201).json(newPayment);
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    updatePayment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id: pk } = req.params;
            const { saleId, amount, method, paidAt, status, reference } = req.body;
            try {
                const exists = yield Payment_1.Payment.findByPk(pk);
                if (!exists)
                    return res.status(404).json({ error: "Payment not found" });
                yield exists.update({ saleId, amount, method, paidAt, status, reference });
                res.status(200).json(exists);
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    deletePayment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const toDelete = yield Payment_1.Payment.findByPk(id);
                if (!toDelete)
                    return res.status(404).json({ error: "Payment not found" });
                yield toDelete.destroy();
                res.status(200).json({ message: "Payment deleted successfully" });
            }
            catch (_a) {
                res.status(500).json({ error: "Error deleting payment" });
            }
        });
    }
    deletePaymentAdv(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // Payment has no boolean-like status for inactivation (enum is business state, not archival)
            res.status(400).json({ error: "Logical delete not supported for Payment" });
        });
    }
}
exports.PaymentController = PaymentController;
