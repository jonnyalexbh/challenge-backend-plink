const serviceUser = require('../services/user');

exports.signUp = (req, res, next) =>
  serviceUser
    .signUp(req.body)
    .then(result => res.status(201).send(result))
    .catch(next);

exports.signIn = (req, res, next) =>
  serviceUser
    .signIn(req.body)
    .then(token => {
      res.status(200).send({ token });
    })
    .catch(next);
