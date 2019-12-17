const { createUser } = require('../services/user');

exports.signUp = (req, res, next) =>
  createUser(req.body)
    .then(result => res.status(201).send(result))
    .catch(next);
