const { factory } = require('factory-girl');
const faker = require('faker');
const { User } = require('../../app/models');

factory.define('user', User, {
  name: () => faker.name.firstName(),
  lastName: () => faker.name.lastName(),
  userName: () => faker.internet.userName(),
  password: () => faker.random.alphaNumeric(10),
  preferredCoin: faker.random.arrayElement(['USD', 'EUR', 'COP'])
});

module.exports = {
  create: params => factory.create('user', params),
  createMany: () => factory.createMany('user', 5),
  build: params => factory.build('user', params),
  attributes: params => factory.attrs('user', params)
};
