const { signUpSchema } = require('../schemas/userSchema');
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
