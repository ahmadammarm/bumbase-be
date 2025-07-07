/* eslint-disable prettier/prettier */
const express = require('express');
const router = express.Router();
const {
  validateSignup,
  validateSignin,
  emailValidator,
  verifyUserValidator,
  recoverPasswordValidator,
  changePasswordValidator,
} = require('../utils/validators/auth');
const validate = require('../utils/validators/validate');

const {authController} = require('../controllers');
const isAuthenticated = require('../middlewares/isAuthenticated');
const rateLimiter = require('../middlewares/rateLimiter');

// sign up and sign in
router.post('/auth/signup', rateLimiter, validateSignup, validate, authController.signup);
router.post('/auth/signin', rateLimiter, validateSignin, validate, authController.signin);

// user verification
router.post('/auth/send-verification-email', emailValidator, validate, authController.verifyCode);
router.post('/auth/verification', verifyUserValidator, validate, authController.verifyUser);

// recover password
router.post('/auth/forgot-password-code', rateLimiter, emailValidator, validate, authController.forgotPasswordCode);
router.post('/auth/recover-password', recoverPasswordValidator, validate, authController.recoverPassword);

// change password
router.put('/auth/change-password', changePasswordValidator, validate, isAuthenticated, authController.changePassword);

module.exports = router;
