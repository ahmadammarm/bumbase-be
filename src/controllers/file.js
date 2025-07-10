const fileUpload = async (request, response, next) => {
  try {
    response.status(200).json({
      message: 'File uploaded successfully',
      file: request.file,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  fileUpload,
};
