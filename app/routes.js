const { healthCheck } = require('./controllers/healthCheck');
const { signUp } = require('./controllers/users');
const { signUpValidator } = require('./middlewares/users');

exports.init = app => {
  app.get('/health', healthCheck);
  app.post('/users/create', signUpValidator, signUp);
};
