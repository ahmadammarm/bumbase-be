const jwt = require('jsonwebtoken');

const generateToken = user => {
  try {
    const token = jwt.sign(
      {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '3d',
      },
    );
    return token;
  } catch (error) {
    throw new Error('Error generating token');
  }
};

module.exports = generateToken;
