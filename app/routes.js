const { healthCheck } = require('./controllers/healthCheck');
const { signUp, authenticate } = require('./controllers/users');
const { createCryptocurrencies } = require('./controllers/cryptocurrencies');
const { signUpValidator, loginValidator } = require('./middlewares/users');
const { checkToken } = require('./middlewares/checkToken');
const { currencyAddValidator } = require('./middlewares/currency');

exports.init = app => {
  app.get('/health', healthCheck);
  app.post('/users/create', signUpValidator, signUp);
  app.post('/users/authenticate', loginValidator, authenticate);
  app.post('/currency/add', [checkToken, currencyAddValidator], createCryptocurrencies);
};
