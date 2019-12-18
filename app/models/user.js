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
      preferredCurrency: {
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
  return User;
};
