const {Category, User} = require('../models');

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

module.exports = {
  addCategory,
};
