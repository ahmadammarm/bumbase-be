/* eslint-disable prettier/prettier */
const Recipe = require("../models/Recipe");

const getAllRecipes = async (request, response, next) => {
  try {
    const recipes = await Recipe.find().populate('createdBy', 'name email');

    response.status(200).json({
      code: 200,
      success: true,
      message: 'Recipes retrieved successfully',
      recipes: recipes,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllRecipes,
};
