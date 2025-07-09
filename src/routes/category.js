const express = require('express');
const router = express.Router();
const {categoryController} = require('../controllers');
const {
  addCategoryValidator,
  categoryIdValidator,
} = require('../utils/validators/category');
const validate = require('../utils/validators/validate');
const isAuthenticated = require('../middlewares/isAuthenticated');
const isAdmin = require('../middlewares/isAdmin');

router.get(
  '/admin/category',
  isAuthenticated,
  isAdmin,
  categoryController.getCategories,
);

router.post(
  '/admin/category',
  isAuthenticated,
  isAdmin,
  addCategoryValidator,
  validate,
  categoryController.addCategory,
);

router.put(
  '/admin/category/:id',
  isAuthenticated,
  isAdmin,
  categoryIdValidator,
  validate,
  categoryController.updateCategory,
);

module.exports = router;
