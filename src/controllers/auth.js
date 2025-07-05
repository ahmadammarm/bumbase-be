const {User} = require('../models');
const hashpassword = require('../utils/hashpassword/hashpassword');
const comparePassword = require('../utils/comparePassword/comparepassword');
const generateToken = require('../utils/generatetoken');
const generateCode = require('../utils/generatecode');
const sendEmail = require('../utils/sendemail');

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

    const token = generateToken(user);

    response.status(200).json({
      code: 200,
      success: true,
      message: 'User signed in successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: token,
      },
    });
  } catch (error) {
    next(error);
  }
};

const verifyCode = async (request, response, next) => {
  try {
    const {email} = request.body;

    const user = await User.findOne({
      email,
    });

    if (!user) {
      response.code = 404;
      throw new Error('User not found');
    }

    if (user.isVerified === true) {
      response.code = 400;
      throw new Error('User is already verified');
    }

    const code = generateCode(6);

    user.verficationCode = code;
    await user.save();

    await sendEmail({
      emailTo: user.email,
      subject: 'Verification Code',
      code: code,
      text: 'verify your account',
    });

    response.status(200).json({
      code: 200,
      success: true,
      message: 'Verification code sent successfully',
      verificationCode: code,
    });
  } catch (error) {
    console.error('Error verifying code:', error);
    throw new Error('Verification failed');
  }
};

module.exports = {
  signup,
  signin,
  verifyCode,
};
