const {User} = require('../models');

const signup = async (request, response, next) => {
  try {
    const {name, email, password, role} = request.body;

    const newUser = new User({
      name,
      email,
      password,
      role,
    });

    await newUser.save();

    response.status(201).json({
      code: 201,
      success: true,
      message: 'User created successfully',
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signup,
};
