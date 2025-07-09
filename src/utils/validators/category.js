const {check, param} = require('express-validator');
const mongoose = require('mongoose');

const addCategoryValidator = [
  check('title').notEmpty().withMessage('Title is required'),
];

const categoryIdValidator = [
  param('id').custom(async id => {
    if (id && !mongoose.Types.ObjectId.isValid(id)) {
      throw new Error('Invalid category ID');
    }
    return true;
  }),
];

module.exports = {
  addCategoryValidator,
  categoryIdValidator,
};
