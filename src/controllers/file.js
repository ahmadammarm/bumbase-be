const path = require('path');
const {validateExtension} = require('../utils/validators/file');
const {File} = require('../models');

const fileUpload = async (request, response, next) => {
  try {
    const {file} = request;

    if (!file) {
      response.code = 400;
      throw new Error('File is required');
    }

    const ext = path.extname(file.originalname).toLowerCase();
    const isValidExt = validateExtension(ext);

    if (!isValidExt) {
      response.code = 400;
      throw new Error(
        'Invalid file type. Only .png, .jpg, and .jpeg are allowed.',
      );
    }

    let newFile = {
      filename: file.filename,
      size: file.size,
      mimetype: file.mimetype,
      createdBy: request.user.id,
    };

    newFile = new File(newFile);

    await newFile.save();

    response.status(201).json({
      code: 201,
      success: true,
      message: 'File uploaded successfully',
      file: {
        id: newFile._id,
        filename: newFile.filename,
        size: newFile.size,
        mimetype: newFile.mimetype,
        createdBy: newFile.createdBy,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  fileUpload,
};
