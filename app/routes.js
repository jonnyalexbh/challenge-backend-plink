const { healthCheck } = require('./controllers/healthCheck');
const { signUp, signIn } = require('./controllers/users');
const { createCoin, coinsByUser, coinsByUsertop } = require('./controllers/cryptocurrencies');
const { signUpValidator, signInValidator } = require('./middlewares/users');
const { checkToken } = require('./middlewares/checkToken');
const { coinValidator } = require('./middlewares/coin');

exports.init = app => {
  app.get('/health', healthCheck);
  app.post('/users/sign-up', signUpValidator, signUp);
  app.post('/users/sign-in', signInValidator, signIn);
  app.post('/users/cryptocurrencies/create', [checkToken, coinValidator], createCoin);
  app.get('/users/cryptocurrencies', checkToken, coinsByUser);
  app.get('/users/cryptocurrencies-top', checkToken, coinsByUsertop);
};
