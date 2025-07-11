/* eslint-disable prettier/prettier */
const express = require('express');
const { recipeController } = require('../controllers');
const isAuthenticated = require('../middlewares/isAuthenticated');
const isAuthor = require('../middlewares/isAuthor');
const isAdmin = require('../middlewares/isAdmin');
const { addRecipeValidator } = require('../utils/validators/recipe');
const validate = require('../utils/validators/validate');
const router = express.Router();

// get all recipes for all users
router.get('/recipe', recipeController.getAllRecipes);
router.get('/recipe/:id', recipeController.getRecipeById);

// author role routes
router.post('/author/recipe', isAuthenticated, isAuthor, addRecipeValidator, validate, isAuthor, recipeController.addRecipe);
router.put('/author/recipe/:id', isAuthenticated, isAuthor, addRecipeValidator, validate, recipeController.updateRecipe);
router.delete('/author/recipe/:id', isAuthenticated, isAuthor, recipeController.deleteRecipe);

// admin role routes
router.post('/admin/recipe', isAuthenticated, isAdmin, recipeController.addRecipe);
router.put('/admin/recipe/:id', isAuthenticated, isAdmin, addRecipeValidator, validate, recipeController.updateRecipe);
router.delete('/admin/recipe/:id', isAuthenticated, isAdmin, recipeController.deleteRecipe);

module.exports = router;