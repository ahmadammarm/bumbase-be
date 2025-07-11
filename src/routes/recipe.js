/* eslint-disable prettier/prettier */
const express = require('express');
const { recipeController } = require('../controllers');
const isAuthenticated = require('../middlewares/isAuthenticated');
const isAuthor = require('../middlewares/isAuthor');
const isAdmin = require('../middlewares/isAdmin');
const router = express.Router();

// get all recipes for all users
router.get('/recipe', recipeController.getAllRecipes);

// author role routes
router.post('/author/recipe', isAuthenticated, isAuthor, recipeController.addRecipe);

// admin role routes
router.post('/admin/recipe', isAuthenticated, isAdmin, recipeController.addRecipe);

module.exports = router;