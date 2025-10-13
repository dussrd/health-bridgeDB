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
exports.RecipeDetailController = void 0;
const RecipeDetail_1 = require("../../models/persons/RecipeDetail");
class RecipeDetailController {
    getAllRecipeDetails(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const details = yield RecipeDetail_1.RecipeDetail.findAll();
                res.status(200).json({ details });
            }
            catch (_a) {
                res.status(500).json({ error: "Error fetching recipe details" });
            }
        });
    }
    getRecipeDetailById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id: pk } = req.params;
                const detail = yield RecipeDetail_1.RecipeDetail.findByPk(pk);
                detail ? res.status(200).json({ detail }) : res.status(404).json({ error: "Recipe detail not found" });
            }
            catch (_a) {
                res.status(500).json({ error: "Error fetching recipe detail" });
            }
        });
    }
    createRecipeDetail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { recipeId, medicationId, dosage, quantity } = req.body;
            try {
                const newDetail = yield RecipeDetail_1.RecipeDetail.create({ recipeId, medicationId, dosage, quantity });
                res.status(201).json(newDetail);
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    updateRecipeDetail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id: pk } = req.params;
            const { recipeId, medicationId, dosage, quantity } = req.body;
            try {
                const exists = yield RecipeDetail_1.RecipeDetail.findByPk(pk);
                if (!exists)
                    return res.status(404).json({ error: "Recipe detail not found" });
                yield exists.update({ recipeId, medicationId, dosage, quantity });
                res.status(200).json(exists);
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    deleteRecipeDetail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const toDelete = yield RecipeDetail_1.RecipeDetail.findByPk(id);
                if (!toDelete)
                    return res.status(404).json({ error: "Recipe detail not found" });
                yield toDelete.destroy();
                res.status(200).json({ message: "Recipe detail deleted successfully" });
            }
            catch (_a) {
                res.status(500).json({ error: "Error deleting recipe detail" });
            }
        });
    }
    deleteRecipeDetailAdv(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // No status field -> soft delete not supported
            res.status(400).json({ error: "Logical delete not supported for RecipeDetail" });
        });
    }
}
exports.RecipeDetailController = RecipeDetailController;
