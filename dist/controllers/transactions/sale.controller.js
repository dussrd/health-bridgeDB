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
exports.SaleController = void 0;
const Sale_1 = require("../../models/transactions/Sale");
class SaleController {
    getAllSales(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sales = yield Sale_1.Sale.findAll({ where: { status: "ACTIVE" } });
                res.status(200).json({ sales });
            }
            catch (_a) {
                res.status(500).json({ error: "Error fetching sales" });
            }
        });
    }
    getSaleById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id: pk } = req.params;
                const sale = yield Sale_1.Sale.findOne({ where: { id: pk, status: "ACTIVE" } });
                sale ? res.status(200).json({ sale }) : res.status(404).json({ error: "Sale not found or cancelled" });
            }
            catch (_a) {
                res.status(500).json({ error: "Error fetching sale" });
            }
        });
    }
    createSale(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { customerId, saleDate, subtotal, taxTotal, total, status, taxId } = req.body;
            try {
                const newSale = yield Sale_1.Sale.create({ customerId, saleDate, subtotal, taxTotal, total, status, taxId });
                res.status(201).json(newSale);
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    updateSale(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id: pk } = req.params;
            const { customerId, saleDate, subtotal, taxTotal, total, status, taxId } = req.body;
            try {
                const exists = yield Sale_1.Sale.findOne({ where: { id: pk, status: "ACTIVE" } });
                if (!exists)
                    return res.status(404).json({ error: "Sale not found or cancelled" });
                yield exists.update({ customerId, saleDate, subtotal, taxTotal, total, status, taxId });
                res.status(200).json(exists);
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    deleteSale(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const toDelete = yield Sale_1.Sale.findByPk(id);
                if (!toDelete)
                    return res.status(404).json({ error: "Sale not found" });
                yield toDelete.destroy();
                res.status(200).json({ message: "Sale deleted successfully" });
            }
            catch (_a) {
                res.status(500).json({ error: "Error deleting sale" });
            }
        });
    }
    deleteSaleAdv(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id: pk } = req.params;
                const toUpdate = yield Sale_1.Sale.findOne({ where: { id: pk, status: "ACTIVE" } });
                if (!toUpdate)
                    return res.status(404).json({ error: "Sale not found" });
                yield toUpdate.update({ status: "CANCELLED" });
                res.status(200).json({ message: "Sale marked as cancelled" });
            }
            catch (_a) {
                res.status(500).json({ error: "Error marking sale as cancelled" });
            }
        });
    }
}
exports.SaleController = SaleController;
