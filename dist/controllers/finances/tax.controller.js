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
exports.TaxController = void 0;
const Tax_1 = require("../../models/finances/Tax");
class TaxController {
    getAllTaxes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const taxes = yield Tax_1.Tax.findAll({ where: { status: "ACTIVE" } });
                res.status(200).json({ taxes });
            }
            catch (_a) {
                res.status(500).json({ error: "Error fetching taxes" });
            }
        });
    }
    getTaxById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id: pk } = req.params;
                const tax = yield Tax_1.Tax.findOne({ where: { id: pk, status: "ACTIVE" } });
                tax ? res.status(200).json({ tax }) : res.status(404).json({ error: "Tax not found or inactive" });
            }
            catch (_a) {
                res.status(500).json({ error: "Error fetching tax" });
            }
        });
    }
    createTax(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, rate, status } = req.body;
            try {
                const newTax = yield Tax_1.Tax.create({ name, rate, status });
                res.status(201).json(newTax);
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    updateTax(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id: pk } = req.params;
            const { name, rate, status } = req.body;
            try {
                const exists = yield Tax_1.Tax.findOne({ where: { id: pk, status: "ACTIVE" } });
                if (!exists)
                    return res.status(404).json({ error: "Tax not found or inactive" });
                yield exists.update({ name, rate, status });
                res.status(200).json(exists);
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    deleteTax(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const toDelete = yield Tax_1.Tax.findByPk(id);
                if (!toDelete)
                    return res.status(404).json({ error: "Tax not found" });
                yield toDelete.destroy();
                res.status(200).json({ message: "Tax deleted successfully" });
            }
            catch (_a) {
                res.status(500).json({ error: "Error deleting tax" });
            }
        });
    }
    deleteTaxAdv(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id: pk } = req.params;
                const toUpdate = yield Tax_1.Tax.findOne({ where: { id: pk, status: "ACTIVE" } });
                if (!toUpdate)
                    return res.status(404).json({ error: "Tax not found" });
                yield toUpdate.update({ status: "INACTIVE" });
                res.status(200).json({ message: "Tax marked as inactive" });
            }
            catch (_a) {
                res.status(500).json({ error: "Error marking tax as inactive" });
            }
        });
    }
}
exports.TaxController = TaxController;
