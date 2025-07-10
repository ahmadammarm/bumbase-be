/* eslint-disable prettier/prettier */
const multer = require('multer');
const path = require('path');
const generateCode = require('../utils/generatecode');

const storage = multer.diskStorage({
  destination: (request, response, callback) => {
    callback(null, './src/uploads');
  },
  filename: (request, file, callback) => {
    const originalName = file.originalname;
    const extension = path.extname(originalName);
    const fileName = originalName.replace(extension, '');
    const compressedFileName = fileName.split(' ').join('_');
    const lowerCaseFileName = compressedFileName.toLocaleLowerCase();
    const code = generateCode(12);
    const finalFile = `${lowerCaseFileName}_${code}${extension}`;

    callback(null, finalFile);
  },
});

const upload = multer({
  storage,
  fileFilter: (request, file, callback) => {
    const mimetype = file.mimetype;
    if (
      mimetype === 'image/png' ||
      mimetype === 'image/jpg' ||
      mimetype === 'image/jpeg'
    ) {
      callback(null, true);
    } else {
      callback(new Error('Only .png, .jpg and .jpeg format allowed!'), false);
    }
  },
});

module.exports = upload;
