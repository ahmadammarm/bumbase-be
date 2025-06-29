const express = require('express');
const router = express.Router();

const { authController } = require('../controllers');

router.post("/auth/signup",  authController.signup);

module.exports = router