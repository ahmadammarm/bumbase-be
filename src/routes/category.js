const express = require('express');
const router = express.Router();
const {categoryController} = require('../controllers');
const {addCategoryValidator} = require('../utils/validators/category');
const validate = require('../utils/validators/validate');
const isAuthenticated = require('../middlewares/isAuthenticated');

router.post(
  '/category',
  addCategoryValidator,
  validate,
  isAuthenticated,
  categoryController.addCategory,
);

module.exports = router;
