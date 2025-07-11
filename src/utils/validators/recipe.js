/* eslint-disable prettier/prettier */
const {check, param} = require('express-validator');
const mongoose = require('mongoose');

const addRecipeValidator = [
  check('title').notEmpty().withMessage('Title is required'),
  check('content').notEmpty().withMessage('Content is required'),
  check('category').custom(async category => {
    if (!mongoose.Types.ObjectId.isValid(category)) {
      throw new Error('Invalid category ID');
    }
  }),
  check('picture').custom(async file => {
    if (file && !mongoose.Types.ObjectId.isValid(file)) {
      throw new Error('Invalid file ID');
    }
  }),
];

const updateRecipeValidator = [
  check('file').custom(async file => {
    if (file && !mongoose.Types.ObjectId.isValid(file)) {
      throw new Error('Invalid file ID');
    }
  }),
  check('category').custom(async category => {
    if (!mongoose.Types.ObjectId.isValid(category)) {
      throw new Error('Invalid category ID');
    }
  }),
];

const idValidator = [
  param('id').custom(async id => {
    if (id && !mongoose.Types.ObjectId.isValid(id)) {
      throw new Error('Invalid recipe ID');
    }
  }),
];

module.exports = {
  addRecipeValidator,
  updateRecipeValidator,
  idValidator,
};
