const { addCryptocurrencies } = require('../services/cryptocurrencies');

exports.createCryptocurrencies = (req, res, next) => {
  addCryptocurrencies(req.body)
    .then(result => res.status(201).send(result))
    .catch(next);
};
