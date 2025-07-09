/* eslint-disable prettier/prettier */
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


// category routes for superadmin role
router.get('/admin/category', isAuthenticated, isAdmin, categoryController.getCategories);
router.post('/admin/category', isAuthenticated, isAdmin, addCategoryValidator, validate, categoryController.addCategory);
router.get('/admin/category/:id', isAuthenticated, isAdmin, categoryIdValidator, validate, categoryController.getCategoryById);
router.put('/admin/category/:id', isAuthenticated, isAdmin, categoryIdValidator, validate, categoryController.updateCategory);
router.delete('/admin/category/:id', isAuthenticated, isAdmin, categoryIdValidator, validate, categoryController.deleteCategoryById);
router.delete('/admin/category', isAuthenticated, isAdmin, categoryController.deleteAllCategories);

// category routes for all authenticated users (author and user role)
router.get('/category', isAuthenticated, categoryController.getCategories);
router.get('/category/:id', isAuthenticated, categoryIdValidator, validate, categoryController.getCategoryById);

module.exports = router;
