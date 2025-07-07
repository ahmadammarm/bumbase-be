const jwt = require('jsonwebtoken');

const isAuthenticated = async (request, response, next) => {
  try {
    const authorization = request.headers.authorization
      ? request.headers.authorization.split(' ')
      : null;

    if (
      !authorization ||
      authorization.length !== 2 ||
      authorization[0] !== 'Bearer'
    ) {
      response.status(401).json({
        code: 401,
        success: false,
        message: 'Unauthorized: Invalid or missing authorization header',
      });
      return;
    }

    const token = authorization.length > 1 ? authorization[1] : null;

    if (token) {
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      if (payload) {
        request.user = {
          id: payload.id,
          name: payload.name,
          email: payload.email,
          role: payload.role,
        };
        next();
      } else {
        response.status(401).json({
          code: 401,
          success: false,
          message: 'Unauthorized: Invalid token',
        });
      }
    } else {
      response.status(401).json({
        code: 401,
        success: false,
        message: 'Unauthorized: Token is required',
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = isAuthenticated;
