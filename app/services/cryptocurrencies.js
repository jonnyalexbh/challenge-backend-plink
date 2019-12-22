const { CryptoCurrencies } = require('../models');
const { checkCoin, getCoin } = require('../services/braveNewCoin');
const { userByCoins } = require('../serializers/coins');
const { SLICE_START, SLICE_END, ORDER_FIELD_DEFAULT, SORT_ORDER_DEFAULT } = require('../constants');
const logger = require('../logger');
const { order } = require('../helpers');

const getCoinsUser = async (userId, preferredCoin) => {
  const coins = await CryptoCurrencies.getByUserId(userId);
  const promisesCoins = coins.map(coin => getCoin(coin.coin, preferredCoin));
  const coinsRensponse = await Promise.all(promisesCoins);
  return coinsRensponse;
};

exports.createCoin = coin =>
  checkCoin(coin)
    .then(() => CryptoCurrencies.createModel(coin))
    .then(res => res)
    .catch(err => {
      logger.error(`Could not create coin: ${coin.coin}`);
      throw err;
    });

exports.getCoinsByUser = async ({ userId, preferredCoin }) => {
  const coins = await getCoinsUser(userId, preferredCoin);
  return userByCoins(coins);
};

exports.getCoinsByUserTop = async ({ userId, preferredCoin }) => {
  const coins = await getCoinsUser(userId, preferredCoin);
  const orderCoins = order(coins, ORDER_FIELD_DEFAULT, SORT_ORDER_DEFAULT);
  return userByCoins(orderCoins).slice(SLICE_START, SLICE_END);
};
