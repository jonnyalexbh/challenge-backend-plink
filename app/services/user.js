const { User } = require('../models');
const errors = require('../errors');
const logger = require('../logger');
const { encryptPassword } = require('../helpers');

exports.createUser = ({ name, lastName, userName, password }) => {
  const user = { name, lastName, userName, password: encryptPassword(password) };
  return User.create(user)
    .then(result => {
      logger.info(`user with name ${user.name} created!`);
      return result;
    })
    .catch(error => {
      if (error.name === 'SequelizeUniqueConstraintError') {
        logger.error('The user entered already exists');
        throw errors.userExistError('The user entered already exists!');
      }
      logger.error(`Could not create user: ${user.name}`);
      throw errors.databaseError(error.message);
    });
};
