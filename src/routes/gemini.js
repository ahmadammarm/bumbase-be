const express = require('express');
const generatePrompt = require('../controllers/gemini');
const router = express.Router();

router.post('/gemini', generatePrompt);

module.exports = router;
