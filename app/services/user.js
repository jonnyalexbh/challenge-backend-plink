const { User } = require('../models');
const errors = require('../errors');
const logger = require('../logger');
const { encryptPassword, checkPassword } = require('../helpers');
const { generateToken } = require('../utils');

exports.signUp = ({ name, lastName, userName, password, preferredCoin }) => {
  const user = { name, lastName, userName, password: encryptPassword(password), preferredCoin };
  return User.create(user)
    .then(result => {
      logger.info(`user with name ${user.name} created!`);
      return result;
    })
    .catch(err => {
      if (err.name === 'SequelizeUniqueConstraintError') {
        logger.error('The user entered already exists');
        throw errors.conflictError('The user entered already exists!');
      }
      logger.error(`Could not create user: ${user.name}`);
      throw errors.databaseError(err.message);
    });
};

exports.signIn = ({ userName, password }) =>
  User.getOneByUserName(userName).then(result => {
    logger.info(`trying to authenticate user ${userName}`);
    if (result && checkPassword(password, result.password)) {
      return generateToken(result);
    }
    logger.error(`There is no user with that userName: ${userName}`);
    throw errors.unauthorizedError('username or password are incorrect');
  });
