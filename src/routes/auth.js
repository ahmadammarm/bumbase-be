const express = require('express');
const router = express.Router();
const { validateSignup } = require('../utils/validators/auth');
const validate = require('../utils/validators/validate');

const { authController } = require('../controllers');

router.post("/auth/signup", validateSignup, validate,  authController.signup);

module.exports = router