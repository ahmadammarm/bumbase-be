const {User} = require('../models');
const hashpassword = require('../utils/hashpassword/hashpassword');
const comparePassword = require('../utils/comparePassword/comparepassword');
const generateToken = require('../utils/generatetoken');
const generateCode = require('../utils/generatecode');
const sendEmail = require('../utils/sendemail');

// sign up method
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

// sign in method
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

// email verification method
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
    });
  } catch (error) {
    response.json({
      code: response.code || 500,
      success: false,
      message: error.message || 'Internal Server Error',
    });
    next(error);
  }
};

// user verification method
const verifyUser = async (request, response, next) => {
  try {
    const {email, code} = request.body;
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

    if (user.verficationCode !== code) {
      response.code = 400;
      throw new Error('Invalid verification code');
    }

    user.isVerified = true;
    user.verficationCode = null;
    await user.save();

    response.status(200).json({
      code: 200,
      success: true,
      message: 'User verified successfully',
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

// forgot password code method
const forgotPasswordCode = async (request, response, next) => {
  try {
    const {email} = request.body;

    const user = await User.findOne({
      email,
    });

    if (!user) {
      response.code = 404;
      throw new Error('User not found');
    }

    const code = generateCode(6);

    user.forgotPasswordCode = code;
    await user.save();

    await sendEmail({
      emailTo: user.email,
      subject: 'Forgot Password Code',
      code: code,
      text: 'Use this code to reset your password',
    });

    response.status(200).json({
      code: 200,
      success: true,
      message: 'Forgot password code sent successfully',
    });
  } catch (error) {
    next(error);
  }
};

// recover password method
const recoverPassword = async (request, response, next) => {
  try {
    const {email, code, password} = request.body;

    const user = await User.findOne({
      email,
    });

    if (!user) {
      response.code = 404;
      throw new Error('User not found');
    }

    if (user.forgotPasswordCode !== code) {
      response.code = 400;
      throw new Error('Invalid forgot password code');
    }

    const hashedPassword = await hashpassword(password);

    user.password = hashedPassword;
    user.forgotPasswordCode = null;
    await user.save();

    response.status(200).json({
      code: 200,
      success: true,
      message: 'Password reset successfully',
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

// change password method
const changePassword = async (request, response, next) => {
  try {
    const {oldPassword, newPassword} = request.body;

    const {email} = request.user;

    const user = await User.findOne({
      email,
    });

    if (!user) {
      response.code = 404;
      throw new Error('User not found');
    }

    const isOldPasswordValid = await comparePassword(
      oldPassword,
      user.password,
    );

    if (!isOldPasswordValid) {
      response.code = 400;
      throw new Error('Invalid old password');
    }

    if (oldPassword === newPassword) {
      response.code = 400;
      throw new Error('New password cannot be the same as old password');
    }

    const hashedNewPassword = await hashpassword(newPassword);
    user.password = hashedNewPassword;
    await user.save();

    response.status(200).json({
      code: 200,
      success: true,
      message: 'Password changed successfully',
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
  verifyCode,
  verifyUser,
  forgotPasswordCode,
  recoverPassword,
  changePassword,
};
