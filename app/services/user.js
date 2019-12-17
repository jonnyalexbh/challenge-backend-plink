const { User } = require('../models');
const errors = require('../errors');
const logger = require('../logger');

exports.createUser = user =>
  User.create(user)
    .then(result => {
      logger.info(`user with name ${user.name} created!`);
      return result;
    })
    .catch(err => {
      if (err.name === 'SequelizeUniqueConstraintError') {
        logger.error('The user entered already exists');
        throw errors.userExistError('the user entered already exists!');
      }
      logger.error(`Could not create user: ${user.name}`);
      throw errors.databaseError(err.message);
    });
