const { factory } = require('factory-girl');
const faker = require('faker');
const { CryptoCurrencies } = require('../../app/models');

factory.define('coin', CryptoCurrencies, {
  coin: () => faker.random.arrayElement(['BTC', 'LTC', 'BOST'])
});

module.exports = {
  create: params => factory.create('coin', params),
  createMany: params => factory.createMany('coin', 1, params),
  build: params => factory.build('coin', params),
  attributes: params => factory.attrs('coin', params)
};
