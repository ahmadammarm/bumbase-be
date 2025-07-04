const {User} = require('../models');
const hashpassword = require('../utils/hashpassword/hashpassword');
const comparePassword = require('../utils/comparePassword/comparepassword');

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

const signin = async (request, response, next) => {
  try {
    const {email, password} = request.body;

    const user = await User.findOne({
      email,
    });

    if (!user) {
      response.code = 400;
      throw new Error('Invalid email');
    }

    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      response.code = 400;
      throw new Error('Invalid password');
    }

    response.status(200).json({
      code: 200,
      success: true,
      message: 'User signed in successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signup,
  signin,
};
