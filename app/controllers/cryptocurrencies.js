const {
  addCryptocurrencies,
  getCryptocurrenciesUser,
  getCryptocurrenciesUserTop
} = require('../services/cryptocurrencies');

exports.createCryptocurrencies = (req, res, next) => {
  addCryptocurrencies(req.body)
    .then(result => res.status(201).send(result))
    .catch(next);
};

exports.cryptocurrenciesList = (req, res, next) => {
  getCryptocurrenciesUser(req.body)
    .then(result => res.status(201).send(result))
    .catch(next);
};

exports.topCryptocurrencies = (req, res, next) => {
  getCryptocurrenciesUserTop(req.body)
    .then(result => res.status(201).send(result))
    .catch(next);
};
