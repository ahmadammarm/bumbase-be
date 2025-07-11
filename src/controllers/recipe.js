/* eslint-disable prettier/prettier */
const {File, Category} = require('../models');
const Recipe = require('../models/Recipe');

const getAllRecipes = async (request, response, next) => {
  try {
    const {search, page, size, category} = request.query;

    const pageNumber = parseInt(page) || 1;
    const sizeNumber = parseInt(size) || 10;
    let searchQuery = {};

    if (search) {
      const searchRegex = new RegExp(search, 'i');

      searchQuery = {
        $or: [{title: searchRegex}],
      };
    }

    if (category) {
      searchQuery = {...searchQuery, category};
    }

    const total = await Recipe.countDocuments(searchQuery);
    const pages = Math.ceil(total / sizeNumber);

    const recipes = await Recipe.find(searchQuery)
      .populate('createdBy', 'name email')
      .populate('category', 'title')
      .populate('picture', 'filename')
      .sort({createdAt: -1})
      .skip((pageNumber - 1) * sizeNumber)
      .limit(sizeNumber);

    response.status(200).json({
      code: 200,
      success: true,
      message: 'Recipes retrieved successfully',
      data: {
        recipes,
        total,
        pages,
        currentPage: pageNumber,
      },
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

const updateRecipe = async (request, response, next) => {
  try {
    const {id} = request.params;
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

    const recipe = await Recipe.findById(id);
    if (!recipe) {
      response.code = 404;
      throw new Error('Recipe not found');
    }

    recipe.title = title ? title : recipe.title;
    recipe.content = content;
    recipe.category = category ? category : recipe.category;
    recipe.picture = picture;
    recipe.createdBy = userId;

    await recipe.save();

    response.status(200).json({
      code: 200,
      success: true,
      message: 'Recipe updated successfully',
      recipe: recipe,
    });
  } catch (error) {
    next(error);
  }
};

const deleteRecipe = async (request, response, next) => {
  try {
    const {id} = request.params;

    const recipe = await Recipe.findById(id);

    if (!recipe) {
      response.code = 404;
      throw new Error('Recipe not found');
    }

    await recipe.findByIdAndDelete(id);

    response.status(200).json({
      code: 200,
      success: true,
      message: 'Recipe deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

const getRecipeById = async (request, response, next) => {
  try {
    const {id} = request.params;

    const recipe = await Recipe.findById(id)
      .populate('createdBy', 'name email')
      .populate('category', 'title')
      .populate('picture', 'filename');

    if (!recipe) {
      response.code = 404;
      throw new Error('Recipe not found');
    }

    response.status(200).json({
      code: 200,
      success: true,
      message: 'Recipe retrieved successfully',
      recipe: recipe,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllRecipes,
  addRecipe,
};
