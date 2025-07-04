const bcrypt = require('bcryptjs');

const comparePassword = (password, hashedPassword) => {
  try {
    const isMatch = bcrypt.compare(password, hashedPassword);
    return isMatch;
  } catch (error) {
    throw new Error('Error comparing passwords');
  }
};

module.exports = comparePassword;
