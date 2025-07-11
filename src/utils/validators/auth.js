const {check} = require('express-validator');
const mongoose = require('mongoose');

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

const verifyUserValidator = [
  check('email')
    .isEmail()
    .withMessage('Please enter a valid email address')
    .notEmpty()
    .withMessage('Email is required')
    .normalizeEmail(),

  check('code').notEmpty().withMessage('Verification code is required'),
];

const recoverPasswordValidator = [
  check('email')
    .isEmail()
    .withMessage('Please enter a valid email address')
    .notEmpty()
    .withMessage('Email is required')
    .normalizeEmail(),

  check('code').notEmpty().withMessage('Verification code is required'),

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

const changePasswordValidator = [
  check('oldPassword').notEmpty().withMessage('Old password is required'),

  check('newPassword').notEmpty().withMessage('New password is required'),
];

const updateProfileValidator = [
  check('email').custom(async email => {
    if (email) {
      if (!/^[a-zA-Z0-9]+@[gG][mM][aA][iI][lL]\.com$/.test(email)) {
        throw new Error('Please enter a valid Gmail address');
      }
      email = email.toLowerCase();
    }
  }),
  check('profilePicture').custom(async profilePicture => {
    if (profilePicture && !mongoose.Types.ObjectId.isValid(profilePicture)) {
      throw new Error('Invalid profile picture');
    }
  }),
];

module.exports = {
  validateSignup,
  validateSignin,
  emailValidator,
  verifyUserValidator,
  recoverPasswordValidator,
  changePasswordValidator,
  updateProfileValidator,
};
