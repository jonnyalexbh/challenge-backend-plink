const logger = require('../logger');
const errors = require('../errors');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      userName: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      preferredCoin: {
        type: DataTypes.ENUM,
        values: ['EUR', 'USD', 'COP'],
        allowNull: false
      }
    },
    {
      tableName: 'users',
      underscored: true
    }
  );

  User.getOne = userName =>
    User.findOne({ where: { userName } }).catch(err => {
      logger.error(err);
      throw errors.databaseError(err);
    });

  User.associate = models => User.hasMany(models.CryptoCurrencies);

  return User;
};
