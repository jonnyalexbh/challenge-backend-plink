const { coinCreateSchema } = require('../schemas/coinSchema');
const logger = require('../logger');
const errors = require('../errors');

exports.coinValidator = async (req, res, next) => {
  try {
    await coinCreateSchema.validate(req.body, { abortEarly: false });
  } catch (err) {
    logger.error(err.errors);
    return next(errors.validationError(err.errors));
  }
  return next();
};
