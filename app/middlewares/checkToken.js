const { verifyToken } = require('../utils');
const errors = require('../errors');

exports.checkToken = (req, res, next) => {
  const { authorization } = req.headers;
  const user = verifyToken(authorization);

  if (user && user.expiresIn <= new Date().getTime()) {
    return next(errors.unauthorizedError('The token is expired.'));
  }

  return next();
};
