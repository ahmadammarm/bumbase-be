const isAdmin = (request, response, next) => {
  try {
    if (request.user && request.user.role === 1) {
      next();
    } else {
      response.status(403).json({
        code: 403,
        success: false,
        message: 'Access denied. Admins only.',
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = isAdmin;
