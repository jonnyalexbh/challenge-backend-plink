const jwt = require('jwt-simple');
const request = require('request-promise');
const config = require('../config/index');
const logger = require('./logger');
const errors = require('./errors');

const { secret_key, expiresInMinutes } = config.common.jwt;

exports.requestApi = options => {
  logger.info(`External Request ${options.method || 'GET'} [${options.uri}]`);
  return request(options);
};

exports.generateToken = user => {
  const tokenPayload = {
    id: user.id,
    name: user.name,
    preferredCoin: user.preferredCoin
  };

  const currentDate = new Date();
  currentDate.setMinutes(currentDate.getMinutes() + parseInt(expiresInMinutes));
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
