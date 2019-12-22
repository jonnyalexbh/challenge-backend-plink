const { verifyToken } = require('../utils');
const errors = require('../errors');
const logger = require('../logger');
const { tokenSchema } = require('../schemas/signInSchema');

exports.checkToken = async (req, res, next) => {
  try {
    await tokenSchema.validate({ Authorization: req.header('Authorization') }, { abortEarly: false });
  } catch (err) {
    logger.error(err.errors);
    return next(errors.validationError(err.errors));
  }

  const { authorization } = req.headers;
  const user = verifyToken(authorization);

  if (user && user.expiresIn <= new Date().getTime()) {
    return next(errors.unauthorizedError('The token is expired.'));
  }

  req.body.userId = user.id;
  req.body.preferredCoin = user.preferredCoin;

  return next();
};
