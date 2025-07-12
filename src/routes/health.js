const express = require('express');
const router = express.Router();

router.get('/health', (_, res) => {
  res.status(200).json({
    status: 'UP',
    timestamp: new Date().toISOString(),
  });
});

module.exports = router;