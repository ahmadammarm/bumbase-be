/* eslint-disable prettier/prettier */
const express = require('express');
const { recipeController } = require('../controllers');
const router = express.Router();

router.get('/recipe', recipeController.getAllRecipes);

module.exports = router;