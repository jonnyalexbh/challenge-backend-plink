const { CryptoCurrencies } = require('../models');
const { checkCryptoCurrency } = require('../services/braveNewCoin');
const logger = require('../logger');

exports.addCryptocurrencies = crypto =>
  checkCryptoCurrency(crypto)
    .then(() => CryptoCurrencies.createModel(crypto))
    .then(res => res)
    .catch(err => {
      logger.error(`Could not create currency: ${crypto.currency}`);
      throw err;
    });
