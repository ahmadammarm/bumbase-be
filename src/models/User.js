const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    matches: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    matches: [
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number',
    ],
  },
  // 1. superadmin, 2. admin, 3. user
  role: {
    type: Number,
    default: 3,
  },
  verficationCode: String,
  isVerified: {
    type: Boolean,
    default: false,
  },
  forgotPasswordCode: String
});

const User = mongoose.model('user', userSchema);
module.exports = User;
