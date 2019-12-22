const serviceCoin = require('../services/cryptocurrencies');

exports.createCoin = (req, res, next) => {
  serviceCoin
    .createCoin(req.body)
    .then(result => res.status(201).send(result))
    .catch(next);
};

exports.coinsByUser = (req, res, next) => {
  serviceCoin
    .getCoinsByUser(req.body)
    .then(result => res.status(200).send(result))
    .catch(next);
};

exports.coinsByUsertop = (req, res, next) => {
  serviceCoin
    .getCoinsByUserTop(req.body)
    .then(result => res.status(200).send(result))
    .catch(next);
};
