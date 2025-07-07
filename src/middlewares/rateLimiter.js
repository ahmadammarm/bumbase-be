/* eslint-disable prettier/prettier */
const rateLimit = require('express-rate-limit');

const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // batas waktu = 15 menit
  max: 5, // batas maksimal request per IP Address
  message: {
    status: 429,
    error: 'Too many requests, please try again within 15 minutes.',
  }, // pesan error jika request melebihi batas max
});

module.exports = rateLimiter;
