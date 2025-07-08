const express = require('express');
const router = express.Router();
const {categoryController} = require('../controllers');
const {addCategoryValidator} = require('../utils/validators/category');
const validate = require('../utils/validators/validate');
const isAuthenticated = require('../middlewares/isAuthenticated');
const isAdmin = require('../middlewares/isAdmin');

router.post(
  '/category',
  isAuthenticated,
  isAdmin,
  addCategoryValidator,
  validate,
  categoryController.addCategory,
);

module.exports = router;
