const errorHandler = (error, request, response, next) => {
  const code = response.code ? response.code : 500;

  response.status(code).json({
    code,
    success: false,
    message: error.message || 'Internal server error',
    stack: error.stack,
  });
};

module.exports = errorHandler;
