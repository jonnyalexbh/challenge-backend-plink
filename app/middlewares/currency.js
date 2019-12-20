const { currencyAddSchema } = require('../schemas/currenciesSchema');
const logger = require('../logger');
const errors = require('../errors');

exports.currencyAddValidator = async (req, res, next) => {
  try {
    await currencyAddSchema.validate(req.body, { abortEarly: false });
  } catch (error) {
    logger.error(error.errors);
    return next(errors.validationError(error.errors));
  }
  return next();
};
