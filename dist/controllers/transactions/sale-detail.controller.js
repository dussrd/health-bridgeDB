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
exports.SaleDetailController = void 0;
const SaleDetail_1 = require("../../models/transactions/SaleDetail");
class SaleDetailController {
    getAllSaleDetails(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const details = yield SaleDetail_1.SaleDetail.findAll();
                res.status(200).json({ details });
            }
            catch (_a) {
                res.status(500).json({ error: "Error fetching sale details" });
            }
        });
    }
    getSaleDetailById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id: pk } = req.params;
                const detail = yield SaleDetail_1.SaleDetail.findByPk(pk);
                detail ? res.status(200).json({ detail }) : res.status(404).json({ error: "Sale detail not found" });
            }
            catch (_a) {
                res.status(500).json({ error: "Error fetching sale detail" });
            }
        });
    }
    createSaleDetail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { saleId, medicationId, quantity, unitPrice, discount } = req.body;
            try {
                const newDetail = yield SaleDetail_1.SaleDetail.create({ saleId, medicationId, quantity, unitPrice, discount });
                res.status(201).json(newDetail);
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    updateSaleDetail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id: pk } = req.params;
            const { saleId, medicationId, quantity, unitPrice, discount } = req.body;
            try {
                const exists = yield SaleDetail_1.SaleDetail.findByPk(pk);
                if (!exists)
                    return res.status(404).json({ error: "Sale detail not found" });
                yield exists.update({ saleId, medicationId, quantity, unitPrice, discount });
                res.status(200).json(exists);
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    deleteSaleDetail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const toDelete = yield SaleDetail_1.SaleDetail.findByPk(id);
                if (!toDelete)
                    return res.status(404).json({ error: "Sale detail not found" });
                yield toDelete.destroy();
                res.status(200).json({ message: "Sale detail deleted successfully" });
            }
            catch (_a) {
                res.status(500).json({ error: "Error deleting sale detail" });
            }
        });
    }
    deleteSaleDetailAdv(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // No status field -> soft delete not supported
            res.status(400).json({ error: "Logical delete not supported for SaleDetail" });
        });
    }
}
exports.SaleDetailController = SaleDetailController;
