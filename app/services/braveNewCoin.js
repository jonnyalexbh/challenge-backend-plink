const logger = require('../logger');
const errors = require('../errors');
const { braveUri, braveApiHost, braveApiKey } = require('../../config').common.braveNewCoinApi;
const { requestApi } = require('../utils');

exports.checkCryptoCurrency = ({ currency }) => {
  const uri = `${braveUri}/ticker?coin=${currency}`;
  return requestApi({
    method: 'GET',
    uri,
    headers: { 'x-rapidapi-host': braveApiHost, 'x-rapidapi-key': braveApiKey },
    json: true
  })
    .then(res => {
      if (!res.success) {
        logger.error('cryptocurrency does not exist');
        throw errors.resourceExistError('cryptocurrency does not exist');
      }
      return true;
    })
    .catch(err => {
      logger.error(err);
      throw err;
    });
};

exports.getCurrency = (coin, preferredCurrency) => {
  const uri = `${braveUri}/ticker`;
  return requestApi({
    method: 'GET',
    uri,
    headers: { 'x-rapidapi-host': braveApiHost, 'x-rapidapi-key': braveApiKey },
    qs: {
      coin,
      show: preferredCurrency
    },
    json: true
  });
};
