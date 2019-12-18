const { signUpSchema } = require('../schemas/userSchema');
const { loginSchema, tokenSchema } = require('../schemas/loginSchema');
const logger = require('../logger');
const errors = require('../errors');

exports.signUpValidator = async (req, res, next) => {
  try {
    await signUpSchema.validate(req.body, { abortEarly: false });
  } catch (error) {
    logger.error(error.errors);
    return next(errors.validationError(error.errors));
  }
  return next();
};

exports.loginValidator = async (req, res, next) => {
  try {
    await loginSchema.validate(req.body, { abortEarly: false });
  } catch (error) {
    logger.error(error.errors);
    return next(errors.validationError(error.errors));
  }
  return next();
};

exports.tokenValidator = async (req, res, next) => {
  try {
    await tokenSchema.validate({ Authorization: req.header('Authorization') }, { abortEarly: false });
  } catch (error) {
    logger.error(error.errors);
    return next(errors.validationError(error.errors));
  }
  return next();
};
