const faker = require('faker');

exports.user = {
  name: faker.name.firstName(),
  lastName: faker.name.lastName(),
  userName: faker.internet.userName(),
  password: faker.random.alphaNumeric(10),
  preferredCurrency: faker.random.arrayElement(['USD', 'EUR', 'COP'])
};
