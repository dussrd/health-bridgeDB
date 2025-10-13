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
exports.RecipeController = void 0;
const Recipe_1 = require("../../models/persons/Recipe");
class RecipeController {
    getAllRecipes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const recipes = yield Recipe_1.Recipe.findAll({ where: { status: "VALID" } });
                res.status(200).json({ recipes });
            }
            catch (_a) {
                res.status(500).json({ error: "Error fetching recipes" });
            }
        });
    }
    getRecipeById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id: pk } = req.params;
                const recipe = yield Recipe_1.Recipe.findOne({ where: { id: pk, status: "VALID" } });
                recipe ? res.status(200).json({ recipe }) : res.status(404).json({ error: "Recipe not found or expired" });
            }
            catch (_a) {
                res.status(500).json({ error: "Error fetching recipe" });
            }
        });
    }
    createRecipe(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { customerId, issuedAt, notes, status } = req.body;
            try {
                const newRecipe = yield Recipe_1.Recipe.create({ customerId, issuedAt, notes, status });
                res.status(201).json(newRecipe);
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    updateRecipe(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id: pk } = req.params;
            const { customerId, issuedAt, notes, status } = req.body;
            try {
                const exists = yield Recipe_1.Recipe.findOne({ where: { id: pk, status: "VALID" } });
                if (!exists)
                    return res.status(404).json({ error: "Recipe not found or expired" });
                yield exists.update({ customerId, issuedAt, notes, status });
                res.status(200).json(exists);
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    deleteRecipe(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const toDelete = yield Recipe_1.Recipe.findByPk(id);
                if (!toDelete)
                    return res.status(404).json({ error: "Recipe not found" });
                yield toDelete.destroy();
                res.status(200).json({ message: "Recipe deleted successfully" });
            }
            catch (_a) {
                res.status(500).json({ error: "Error deleting recipe" });
            }
        });
    }
    deleteRecipeAdv(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id: pk } = req.params;
                const toUpdate = yield Recipe_1.Recipe.findOne({ where: { id: pk, status: "VALID" } });
                if (!toUpdate)
                    return res.status(404).json({ error: "Recipe not found" });
                yield toUpdate.update({ status: "EXPIRED" });
                res.status(200).json({ message: "Recipe marked as expired" });
            }
            catch (_a) {
                res.status(500).json({ error: "Error marking recipe as expired" });
            }
        });
    }
}
exports.RecipeController = RecipeController;
