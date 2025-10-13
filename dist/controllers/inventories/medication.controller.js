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
exports.MedicationController = void 0;
const Medication_1 = require("../../models/inventories/Medication");
class MedicationController {
    getAllMedications(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const medications = yield Medication_1.Medication.findAll({ where: { status: "AVAILABLE" } });
                res.status(200).json({ medications });
            }
            catch (_a) {
                res.status(500).json({ error: "Error fetching medications" });
            }
        });
    }
    getMedicationById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id: pk } = req.params;
                const medication = yield Medication_1.Medication.findOne({ where: { id: pk, status: "AVAILABLE" } });
                medication ? res.status(200).json({ medication }) : res.status(404).json({ error: "Medication not found or unavailable" });
            }
            catch (_a) {
                res.status(500).json({ error: "Error fetching medication" });
            }
        });
    }
    createMedication(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, description, unit, price, stock, categoryId, status } = req.body;
            try {
                const newMedication = yield Medication_1.Medication.create({ name, description, unit, price, stock, categoryId, status });
                res.status(201).json(newMedication);
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    updateMedication(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id: pk } = req.params;
            const { name, description, unit, price, stock, categoryId, status } = req.body;
            try {
                const exists = yield Medication_1.Medication.findOne({ where: { id: pk, status: "AVAILABLE" } });
                if (!exists)
                    return res.status(404).json({ error: "Medication not found or unavailable" });
                yield exists.update({ name, description, unit, price, stock, categoryId, status });
                res.status(200).json(exists);
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    deleteMedication(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const toDelete = yield Medication_1.Medication.findByPk(id);
                if (!toDelete)
                    return res.status(404).json({ error: "Medication not found" });
                yield toDelete.destroy();
                res.status(200).json({ message: "Medication deleted successfully" });
            }
            catch (_a) {
                res.status(500).json({ error: "Error deleting medication" });
            }
        });
    }
    deleteMedicationAdv(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id: pk } = req.params;
                const toUpdate = yield Medication_1.Medication.findOne({ where: { id: pk, status: "AVAILABLE" } });
                if (!toUpdate)
                    return res.status(404).json({ error: "Medication not found" });
                yield toUpdate.update({ status: "UNAVAILABLE" });
                res.status(200).json({ message: "Medication marked as unavailable" });
            }
            catch (_a) {
                res.status(500).json({ error: "Error marking medication as unavailable" });
            }
        });
    }
}
exports.MedicationController = MedicationController;
