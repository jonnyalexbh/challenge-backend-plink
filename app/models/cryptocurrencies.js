const logger = require('../logger');
const errors = require('../errors');

module.exports = (sequelize, DataTypes) => {
  const CryptoCurrencies = sequelize.define(
    'CryptoCurrencies',
    {
      coin: {
        type: DataTypes.STRING,
        allowNull: false
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      tableName: 'crypto_currencies',
      underscored: true
    }
  );

  CryptoCurrencies.createModel = userCoin =>
    CryptoCurrencies.create(userCoin).catch(error => {
      if (error.name === 'SequelizeUniqueConstraintError') {
        logger.error(`The user has already added this coin ${userCoin.coin}`);
        throw errors.conflictError(`The user has already added this coin ${userCoin.coin}`);
      }
      if (error.name === 'SequelizeForeignKeyConstraintError') {
        logger.error('The cryptocurrency cannot be inserted because the user does not exist');
        throw errors.conflictError('The cryptocurrency cannot be inserted because the user does not exist');
      }
      logger.error(error);
      throw errors.databaseError(error);
    });

  CryptoCurrencies.getByUserId = userId =>
    CryptoCurrencies.findAll({ where: { userId } }).catch(err => {
      logger.error(err);
      throw errors.databaseError(err);
    });

  CryptoCurrencies.associate = models => CryptoCurrencies.belongsTo(models.User, { foreignKey: 'userId' });

  return CryptoCurrencies;
};
