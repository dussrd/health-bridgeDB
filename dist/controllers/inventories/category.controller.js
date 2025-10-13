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
exports.CategoryController = void 0;
const Category_1 = require("../../models/inventories/Category");
class CategoryController {
    getAllCategories(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const categories = yield Category_1.Category.findAll({ where: { status: "ACTIVE" } });
                res.status(200).json({ categories });
            }
            catch (_a) {
                res.status(500).json({ error: "Error fetching categories" });
            }
        });
    }
    getCategoryById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id: pk } = req.params;
                const category = yield Category_1.Category.findOne({ where: { id: pk, status: "ACTIVE" } });
                category ? res.status(200).json({ category }) : res.status(404).json({ error: "Category not found or inactive" });
            }
            catch (_a) {
                res.status(500).json({ error: "Error fetching category" });
            }
        });
    }
    createCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, description, status } = req.body;
            try {
                const newCategory = yield Category_1.Category.create({ name, description, status });
                res.status(201).json(newCategory);
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    updateCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id: pk } = req.params;
            const { name, description, status } = req.body;
            try {
                const exists = yield Category_1.Category.findOne({ where: { id: pk, status: "ACTIVE" } });
                if (!exists)
                    return res.status(404).json({ error: "Category not found or inactive" });
                yield exists.update({ name, description, status });
                res.status(200).json(exists);
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    deleteCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const toDelete = yield Category_1.Category.findByPk(id);
                if (!toDelete)
                    return res.status(404).json({ error: "Category not found" });
                yield toDelete.destroy();
                res.status(200).json({ message: "Category deleted successfully" });
            }
            catch (_a) {
                res.status(500).json({ error: "Error deleting category" });
            }
        });
    }
    deleteCategoryAdv(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id: pk } = req.params;
                const toUpdate = yield Category_1.Category.findOne({ where: { id: pk, status: "ACTIVE" } });
                if (!toUpdate)
                    return res.status(404).json({ error: "Category not found" });
                yield toUpdate.update({ status: "INACTIVE" });
                res.status(200).json({ message: "Category marked as inactive" });
            }
            catch (_a) {
                res.status(500).json({ error: "Error marking category as inactive" });
            }
        });
    }
}
exports.CategoryController = CategoryController;
