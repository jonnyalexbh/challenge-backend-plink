const { verifyToken } = require('../utils');
const errors = require('../errors');
const logger = require('../logger');
const { tokenSchema } = require('../schemas/loginSchema');

exports.checkToken = async (req, res, next) => {
  try {
    await tokenSchema.validate({ Authorization: req.header('Authorization') }, { abortEarly: false });
  } catch (error) {
    logger.error(error.errors);
    return next(errors.validationError(error.errors));
  }

  const { authorization } = req.headers;
  const user = verifyToken(authorization);

  if (user && user.expiresIn <= new Date().getTime()) {
    return next(errors.unauthorizedError('The token is expired.'));
  }

  req.body.userId = user.id;
  req.body.preferredCurrency = user.preferredCurrency;

  return next();
};
