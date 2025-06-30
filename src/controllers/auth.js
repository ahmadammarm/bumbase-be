const {User} = require('../models');
const hashpassword = require('../utils/hashpassword/hashpassword');

const signup = async (request, response, next) => {
  try {
    const {name, email, password, role} = request.body;

    const isEmailExists = await User.findOne({
      email,
    });

    if (isEmailExists) {
      response.code = 400;
      throw new Error('Email already exists');
    }

    const hashedPassword = await hashpassword(password);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
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
