/* eslint-disable prettier/prettier */
const {File, Category} = require('../models');
const Recipe = require('../models/Recipe');

const getAllRecipes = async (request, response, next) => {
  try {
    const recipes = await Recipe.find().populate('createdBy', 'name email').populate('category', 'title').populate('picture', 'filename');

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

const addRecipe = async (request, response, next) => {
  try {
    const {title, content, category, picture} = request.body;
    const userId = request.user.id;

    if (picture) {
      const file = await File.findById(picture);
      if (!file) {
        response.code = 404;
        throw new Error('File not found');
      }
    }

    const isCategoryExists = await Category.findById(category);
    if (!isCategoryExists) {
      response.code = 404;
      throw new Error('Category not found');
    }

    const newRecipe = new Recipe({
      title,
      content,
      createdBy: userId,
      category,
      picture: picture ? picture : null,
    });

    await newRecipe.save();

    response.status(201).json({
      code: 201,
      success: true,
      message: 'Recipe created successfully',
      recipe: newRecipe,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllRecipes,
  addRecipe,
};
