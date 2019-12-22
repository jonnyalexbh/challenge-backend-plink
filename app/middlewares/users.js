const { signUpSchema } = require('../schemas/signUpSchema');
const { signInSchema } = require('../schemas/signInSchema');
const logger = require('../logger');
const errors = require('../errors');

exports.signUpValidator = async (req, res, next) => {
  try {
    await signUpSchema.validate(req.body, { abortEarly: false });
  } catch (err) {
    logger.error(err.errors);
    return next(errors.validationError(err.errors));
  }
  return next();
};

exports.signInValidator = async (req, res, next) => {
  try {
    await signInSchema.validate(req.body, { abortEarly: false });
  } catch (err) {
    logger.error(err.errors);
    return next(errors.validationError(err.errors));
  }
  return next();
};
