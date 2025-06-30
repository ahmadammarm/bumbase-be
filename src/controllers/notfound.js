const notfound = (request, response, next) => {
  response.status(404).json({
    code: 404,
    success: false,
    message: 'Resource not found',
  });
};

module.exports = notfound;
