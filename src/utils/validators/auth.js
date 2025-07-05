const {check} = require('express-validator');

const validateSignup = [
  check('name').notEmpty().withMessage('Name is required').trim(),

  check('email')
    .isEmail()
    .withMessage('Please enter a valid email address')
    .notEmpty()
    .withMessage('Email is required')
    .normalizeEmail(),

  check('password')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/)
    .withMessage(
      'Password must contain at least one uppercase letter, one lowercase letter, and one number',
    )
    .isLength({min: 8})
    .withMessage('Password must be at least 8 characters long')
    .notEmpty()
    .withMessage('Password is required'),
];

const validateSignin = [
  check('email')
    .isEmail()
    .withMessage('Please enter a valid email address')
    .notEmpty()
    .withMessage('Email is required')
    .normalizeEmail(),

  check('password').notEmpty().withMessage('Password is required'),
];

const emailValidator = [
  check('email')
    .isEmail()
    .withMessage('Please enter a valid email address')
    .notEmpty()
    .withMessage('Email is required')
    .normalizeEmail(),
];

module.exports = {
  validateSignup,
  validateSignin,
  emailValidator,
};
