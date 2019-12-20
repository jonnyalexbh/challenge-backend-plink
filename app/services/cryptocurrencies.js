const { CryptoCurrencies } = require('../models');
const { checkCryptoCurrency, getCurrency } = require('../services/braveNewCoin');
const { userCryptocurrencies } = require('../serializers/crypto_currencies');
const { SLICE_START, SLICE_END, ORDER_FIELD_DEFAULT, SORT_ORDER_DEFAULT } = require('../constants');
const logger = require('../logger');
const { order } = require('../helpers');

exports.addCryptocurrencies = crypto =>
  checkCryptoCurrency(crypto)
    .then(() => CryptoCurrencies.createModel(crypto))
    .then(res => res)
    .catch(err => {
      logger.error(`Could not create currency: ${crypto.currency}`);
      throw err;
    });

const getCryptoUser = async (userId, preferredCurrency) => {
  const currencies = await CryptoCurrencies.getByUserId(userId);
  const promisesCurrencies = currencies.map(currency => getCurrency(currency.currency, preferredCurrency));
  const currenciesRensponse = await Promise.all(promisesCurrencies);
  return currenciesRensponse;
};

exports.getCryptocurrenciesUser = async ({ userId, preferredCurrency }) => {
  const currencies = await getCryptoUser(userId, preferredCurrency);
  return userCryptocurrencies(currencies);
};

exports.getCryptocurrenciesUserTop = async ({ userId, preferredCurrency }) => {
  const currencies = await getCryptoUser(userId, preferredCurrency);
  const orderCurrencies = order(currencies, ORDER_FIELD_DEFAULT, SORT_ORDER_DEFAULT);
  return userCryptocurrencies(orderCurrencies).slice(SLICE_START, SLICE_END);
};
