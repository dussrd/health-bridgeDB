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
exports.SupplierController = void 0;
const Supplier_1 = require("../../models/inventories/Supplier");
class SupplierController {
    getAllSuppliers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const suppliers = yield Supplier_1.Supplier.findAll({ where: { status: "ACTIVE" } });
                res.status(200).json({ suppliers });
            }
            catch (_a) {
                res.status(500).json({ error: "Error fetching suppliers" });
            }
        });
    }
    getSupplierById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id: pk } = req.params;
                const supplier = yield Supplier_1.Supplier.findOne({ where: { id: pk, status: "ACTIVE" } });
                supplier ? res.status(200).json({ supplier }) : res.status(404).json({ error: "Supplier not found or inactive" });
            }
            catch (_a) {
                res.status(500).json({ error: "Error fetching supplier" });
            }
        });
    }
    createSupplier(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, contactName, phone, email, address, status } = req.body;
            try {
                const newSupplier = yield Supplier_1.Supplier.create({ name, contactName, phone, email, address, status });
                res.status(201).json(newSupplier);
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    updateSupplier(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id: pk } = req.params;
            const { name, contactName, phone, email, address, status } = req.body;
            try {
                const exists = yield Supplier_1.Supplier.findOne({ where: { id: pk, status: "ACTIVE" } });
                if (!exists)
                    return res.status(404).json({ error: "Supplier not found or inactive" });
                yield exists.update({ name, contactName, phone, email, address, status });
                res.status(200).json(exists);
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    deleteSupplier(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const toDelete = yield Supplier_1.Supplier.findByPk(id);
                if (!toDelete)
                    return res.status(404).json({ error: "Supplier not found" });
                yield toDelete.destroy();
                res.status(200).json({ message: "Supplier deleted successfully" });
            }
            catch (_a) {
                res.status(500).json({ error: "Error deleting supplier" });
            }
        });
    }
    deleteSupplierAdv(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id: pk } = req.params;
                const toUpdate = yield Supplier_1.Supplier.findOne({ where: { id: pk, status: "ACTIVE" } });
                if (!toUpdate)
                    return res.status(404).json({ error: "Supplier not found" });
                yield toUpdate.update({ status: "INACTIVE" });
                res.status(200).json({ message: "Supplier marked as inactive" });
            }
            catch (_a) {
                res.status(500).json({ error: "Error marking supplier as inactive" });
            }
        });
    }
}
exports.SupplierController = SupplierController;
