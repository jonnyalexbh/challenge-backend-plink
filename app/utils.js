const jwt = require('jwt-simple');
const config = require('../config/index');
const logger = require('./logger');
const errors = require('./errors');

const { secret_key } = config.common.jwt;

exports.generateToken = user => {
  const tokenPayload = {
    lastName: user.lastName,
    name: user.name
  };

  const currentDate = new Date();
  currentDate.setMinutes(currentDate.getMinutes() + 1);
  tokenPayload.expiresIn = currentDate.getTime();

  return jwt.encode(tokenPayload, secret_key);
};

exports.verifyToken = token => {
  try {
    return jwt.decode(token, secret_key);
  } catch (error) {
    logger.error(error);
    throw errors.unauthorizedError('The token is incorrect.');
  }
};
