/* eslint-disable radix */
/* eslint-disable prettier/prettier */
const {Category, User} = require('../models');

const getCategories = async (request, response, next) => {
  try {
    const {search, size, page} = request.query;

    let searchCategory = {isDeleted: {$ne: true}};

    const sizeNumber = parseInt(size) || 10;
    const pageNumber = parseInt(page) || 1;

    if (search) {
      const regex = RegExp(search, 'i');

      searchCategory = {
        $or: [{title: {$regex: regex}}],
      };
    }

    const totalCategories = await Category.countDocuments(searchCategory);
    const totalPages = Math.ceil(totalCategories / sizeNumber);

    const categories = await Category.find(searchCategory)
      .skip((pageNumber - 1) * sizeNumber)
      .limit(sizeNumber)
      .sort({updatedBy: -1});

    if (categories.length === 0) {
      return response.status(404).json({
        code: 404,
        success: false,
        message: 'No categories found',
      });
    }

    response.status(200).json({
      code: 200,
      success: true,
      message: 'Categories retrieved successfully',
      data: {
        categories,
        totalCategories,
        totalPages,
        currentPage: pageNumber,
      },
    });
  } catch (error) {
    next(error);
  }
};

const addCategory = async (request, response, next) => {
  try {
    const {title, description} = request.body;

    const userId = request.user.id;

    const isCategoryExist = await Category.findOne({
      title,
    });

    if (isCategoryExist) {
      return response.status(400).json({
        code: 400,
        success: false,
        message: 'Category already exists',
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return response.status(404).json({
        code: 404,
        success: false,
        message: 'User not found',
      });
    }

    const newCategory = new Category({
      title,
      description,
      updatedBy: userId,
    });

    await newCategory.save();

    response.status(201).json({
      code: 201,
      success: true,
      message: 'Category added successfully',
      data: {
        id: newCategory._id,
        title: newCategory.title,
        description: newCategory.description,
        updatedBy: userId,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getCategoryById = async (request, response, next) => {
  try {
    const {id} = request.params;

    const category = await Category.findById(id);

    if (!category) {
      return response.status(404).json({
        code: 404,
        success: false,
        message: 'Category not found',
      });
    }

    response.status(200).json({
      code: 200,
      success: true,
      message: 'Category retrieved successfully',
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

const updateCategory = async (request, response, next) => {
  try {
    const {id} = request.params;
    const userId = request.user.id;

    const {title, description} = request.body || {};

    const category = await Category.findById(id);

    if (!category) {
      return response.status(404).json({
        code: 404,
        success: false,
        message: 'Category not found',
      });
    }

    const isCategoryExist = await Category.findOne({
      title,
    });

    if (
      isCategoryExist &&
      isCategoryExist.title === title &&
      String(isCategoryExist._id) !== String(category._id)
    ) {
      return response.status(400).json({
        code: 400,
        success: false,
        message: 'Category with this title already exists',
      });
    }
    category.title = title ? title : category.title;
    category.description = description ? description : category.description;
    category.updatedBy = userId;

    await category.save();

    response.status(200).json({
      code: 200,
      success: true,
      message: 'Category updated successfully',
      data: {
        id: category._id,
        title: category.title,
        description: category.description,
        updatedBy: userId,
        createdAt: category.createdAt,
        updatedAt: category.updatedAt,
      },
    });
  } catch (error) {
    next(error);
  }
};
const deleteCategoryById = async (request, response, next) => {
  try {
    const {id} = request.params;

    const category = await Category.findById(id);

    if (!category) {
      return response.status(404).json({
        code: 404,
        success: false,
        message: 'Category not found',
      });
    }

    await category.updateOne({
      isDeleted: true,
      deletedAt: new Date(),
    });

    response.status(200).json({
      code: 200,
      success: true,
      message: 'Category deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

const deleteAllCategories = async (_, response, next) => {
  try {
    await Category.updateMany(
      {isDeleted: false},
      {
        isDeleted: true,
        deletedAt: new Date(),
      },
    );

    return response.status(200).json({
      code: 200,
      success: true,
      message: 'All categories deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCategories,
  addCategory,
  getCategoryById,
  updateCategory,
  deleteCategoryById,
  deleteAllCategories,
};
