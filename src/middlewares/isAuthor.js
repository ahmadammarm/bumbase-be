const isAuthor = (request, response, next) => {
  try {
    if (request.user && request.user.role === 2) {
      next();
    } else {
      response.status(403).json({
        code: 403,
        success: false,
        message: 'Access denied. Authors only.',
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = isAuthor;
