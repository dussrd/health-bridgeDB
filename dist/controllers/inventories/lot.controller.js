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
exports.LotController = void 0;
const Lot_1 = require("../../models/inventories/Lot");
class LotController {
    getAllLots(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const lots = yield Lot_1.Lot.findAll({ where: { status: "ACTIVE" } });
                res.status(200).json({ lots });
            }
            catch (_a) {
                res.status(500).json({ error: "Error fetching lots" });
            }
        });
    }
    getLotById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id: pk } = req.params;
                const lot = yield Lot_1.Lot.findOne({ where: { id: pk, status: "ACTIVE" } });
                lot ? res.status(200).json({ lot }) : res.status(404).json({ error: "Lot not found or inactive" });
            }
            catch (_a) {
                res.status(500).json({ error: "Error fetching lot" });
            }
        });
    }
    createLot(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { code, medicationId, supplierId, quantity, expirationDate, receivedAt, status } = req.body;
            try {
                const newLot = yield Lot_1.Lot.create({ code, medicationId, supplierId, quantity, expirationDate, receivedAt, status });
                res.status(201).json(newLot);
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    updateLot(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id: pk } = req.params;
            const { code, medicationId, supplierId, quantity, expirationDate, receivedAt, status } = req.body;
            try {
                const exists = yield Lot_1.Lot.findOne({ where: { id: pk, status: "ACTIVE" } });
                if (!exists)
                    return res.status(404).json({ error: "Lot not found or inactive" });
                yield exists.update({ code, medicationId, supplierId, quantity, expirationDate, receivedAt, status });
                res.status(200).json(exists);
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    deleteLot(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const toDelete = yield Lot_1.Lot.findByPk(id);
                if (!toDelete)
                    return res.status(404).json({ error: "Lot not found" });
                yield toDelete.destroy();
                res.status(200).json({ message: "Lot deleted successfully" });
            }
            catch (_a) {
                res.status(500).json({ error: "Error deleting lot" });
            }
        });
    }
    deleteLotAdv(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id: pk } = req.params;
                const toUpdate = yield Lot_1.Lot.findOne({ where: { id: pk, status: "ACTIVE" } });
                if (!toUpdate)
                    return res.status(404).json({ error: "Lot not found" });
                yield toUpdate.update({ status: "INACTIVE" });
                res.status(200).json({ message: "Lot marked as inactive" });
            }
            catch (_a) {
                res.status(500).json({ error: "Error marking lot as inactive" });
            }
        });
    }
}
exports.LotController = LotController;
