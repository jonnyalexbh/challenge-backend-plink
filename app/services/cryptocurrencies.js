const { CryptoCurrencies } = require('../models');
const { checkCryptoCurrency, getCurrency } = require('../services/braveNewCoin');
const { userCryptocurrencies } = require('../serializers/crypto_currencies');
const logger = require('../logger');

exports.addCryptocurrencies = crypto =>
  checkCryptoCurrency(crypto)
    .then(() => CryptoCurrencies.createModel(crypto))
    .then(res => res)
    .catch(err => {
      logger.error(`Could not create currency: ${crypto.currency}`);
      throw err;
    });

exports.getCryptocurrenciesUser = async ({ userId, preferredCurrency }) => {
  const currencies = await CryptoCurrencies.getAll(userId);
  const promisesCurrencies = currencies.map(currency => getCurrency(currency.currency, preferredCurrency));
  const currenciesRensponse = await Promise.all(promisesCurrencies);
  return userCryptocurrencies(currenciesRensponse);
};
