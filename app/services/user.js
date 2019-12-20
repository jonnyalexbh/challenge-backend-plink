const { User } = require('../models');
const errors = require('../errors');
const logger = require('../logger');
const { encryptPassword, checkPassword } = require('../helpers');
const { generateToken } = require('../utils');

exports.createUser = ({ name, lastName, userName, password, preferredCurrency }) => {
  const user = { name, lastName, userName, password: encryptPassword(password), preferredCurrency };
  return User.create(user)
    .then(result => {
      logger.info(`user with name ${user.name} created!`);
      return result;
    })
    .catch(error => {
      if (error.name === 'SequelizeUniqueConstraintError') {
        logger.error('The user entered already exists');
        throw errors.resourceExistError('The user entered already exists!');
      }
      logger.error(`Could not create user: ${user.name}`);
      throw errors.databaseError(error.message);
    });
};

exports.login = user =>
  User.getOne(user.userName).then(result => {
    logger.info(`trying to authenticate user ${user.userName}`);
    if (result && checkPassword(user.password, result.password)) {
      return generateToken(result);
    }
    logger.error(`There is no user with that userName: ${user.userName}`);
    throw errors.unauthorizedError('username or password are incorrect');
  });
