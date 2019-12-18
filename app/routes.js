const { healthCheck } = require('./controllers/healthCheck');
const { signUp, authenticate } = require('./controllers/users');
const { signUpValidator, loginValidator, tokenValidator } = require('./middlewares/users');
const { checkToken } = require('./middlewares/checkToken');

exports.init = app => {
  app.get('/health', healthCheck);
  app.post('/users/create', signUpValidator, signUp);
  app.post('/users/authenticate', loginValidator, authenticate);
  app.get('/users/test', [tokenValidator, checkToken], (_, res) => {
    res.send({ info: 'hello' });
  });
};
