const {check} = require('express-validator');

const addCategoryValidator = [
  check('title').notEmpty().withMessage('Title is required'),
];

module.exports = {
  addCategoryValidator,
};
