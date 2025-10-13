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
exports.CustomerController = void 0;
const Customer_1 = require("../../models/persons/Customer");
class CustomerController {
    getAllCustomers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const customers = yield Customer_1.Customer.findAll({ where: { status: "ACTIVE" } });
                res.status(200).json({ customers });
            }
            catch (_a) {
                res.status(500).json({ error: "Error fetching customers" });
            }
        });
    }
    getCustomerById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id: pk } = req.params;
                const customer = yield Customer_1.Customer.findOne({ where: { id: pk, status: "ACTIVE" } });
                customer ? res.status(200).json({ customer }) : res.status(404).json({ error: "Customer not found or inactive" });
            }
            catch (_a) {
                res.status(500).json({ error: "Error fetching customer" });
            }
        });
    }
    createCustomer(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, password, firstName, lastName, documentType, documentNumber, phone, email, address, status } = req.body;
            try {
                const newCustomer = yield Customer_1.Customer.create({
                    username, password, firstName, lastName,
                    documentType, documentNumber, phone, email, address, status
                });
                res.status(201).json(newCustomer);
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    updateCustomer(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id: pk } = req.params;
            const { username, password, firstName, lastName, documentType, documentNumber, phone, email, address, status } = req.body;
            try {
                const exists = yield Customer_1.Customer.findOne({ where: { id: pk, status: "ACTIVE" } });
                if (!exists)
                    return res.status(404).json({ error: "Customer not found or inactive" });
                yield exists.update({
                    username, password, firstName, lastName,
                    documentType, documentNumber, phone, email, address, status
                });
                res.status(200).json(exists);
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    deleteCustomer(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const toDelete = yield Customer_1.Customer.findByPk(id);
                if (!toDelete)
                    return res.status(404).json({ error: "Customer not found" });
                yield toDelete.destroy();
                res.status(200).json({ message: "Customer deleted successfully" });
            }
            catch (_a) {
                res.status(500).json({ error: "Error deleting customer" });
            }
        });
    }
    deleteCustomerAdv(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id: pk } = req.params;
                const toUpdate = yield Customer_1.Customer.findOne({ where: { id: pk, status: "ACTIVE" } });
                if (!toUpdate)
                    return res.status(404).json({ error: "Customer not found" });
                yield toUpdate.update({ status: "INACTIVE" });
                res.status(200).json({ message: "Customer marked as inactive" });
            }
            catch (_a) {
                res.status(500).json({ error: "Error marking customer as inactive" });
            }
        });
    }
}
exports.CustomerController = CustomerController;
