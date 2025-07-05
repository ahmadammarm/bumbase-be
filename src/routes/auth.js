const express = require('express');
const router = express.Router();
const {
  validateSignup,
  validateSignin,
  emailValidator,
} = require('../utils/validators/auth');
const validate = require('../utils/validators/validate');

const {authController} = require('../controllers');

router.post('/auth/signup', validateSignup, validate, authController.signup);
router.post('/auth/signin', validateSignin, validate, authController.signin);
router.post(
  '/auth/send-verification-email',
  emailValidator,
  validate,
  authController.verifyCode,
);

module.exports = router;
