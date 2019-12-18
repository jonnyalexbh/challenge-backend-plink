const { createUser, login } = require('../services/user');

exports.signUp = (req, res, next) =>
  createUser(req.body)
    .then(result => res.status(201).send(result))
    .catch(next);

exports.authenticate = (req, res, next) =>
  login(req.body)
    .then(token => {
      res.status(200).send({ token });
    })
    .catch(next);
