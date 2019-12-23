const rpMock = require('request-promise');
const request = require('supertest');
const app = require('../app');

jest.mock('request-promise');

const { generateToken } = require('../app/utils');
const userFactory = require('./factory/userFactory');
const coinFactory = require('./factory/coinFactory');
const { verifyToken } = require('../app/utils');
const { newCoin, listCoinsByUser, checkCoinOk, checkCoinError } = require('./mocks/coin');

afterEach(() => {
  rpMock.mockReset();
});

describe('Create Coin', () => {
  it('should fail because the token is missing', async done => {
    rpMock.mockResolvedValueOnce(checkCoinOk);
    const user = await userFactory.create();
    const res = await request(app)
      .post('/users/cryptocurrencies')
      .send({ coin: 'COP', user_id: user.user_id });
    expect(res.status).toEqual(422);
    expect(res.body.message[0]).toEqual('The authorization is required.');
    done();
  });
  it('should allow adding a cryptocurrency to the user', async done => {
    rpMock.mockResolvedValueOnce(checkCoinOk);
    const user = await userFactory.create();
    const token = generateToken(user);
    const res = await request(app)
      .post('/users/cryptocurrencies')
      .set('Authorization', `${token}`)
      .send({ coin: 'BTC' });
    expect(res.status).toEqual(201);
    expect(res.body.coin).toEqual('BTC');
    done();
  });
  it('should fail because the cryptocurrency is not valid', async done => {
    rpMock.mockResolvedValueOnce(checkCoinError);
    const user = await userFactory.create();
    const token = generateToken(user);
    const res = await request(app)
      .post('/users/cryptocurrencies')
      .set('Authorization', `${token}`)
      .send({ coin: 'COP' });
    expect(res.status).toEqual(409);
    expect(res.body.message).toEqual('cryptocurrency does not exist');
    done();
  });
});

describe('List Coins', () => {
  it('list coin by user', async done => {
    rpMock.mockResolvedValueOnce(checkCoinOk);
    const user = await userFactory.create();
    const token = generateToken(user);
    const checkToken = verifyToken(token);
    await coinFactory.create(newCoin);
    const res = await request(app)
      .get('/users/cryptocurrencies')
      .set('Authorization', `${token}`)
      .send({ userId: checkToken.userId, preferredCoin: checkToken.preferredCoin });
    expect(res.status).toEqual(200);
    expect(res.body).toEqual(listCoinsByUser);
    done();
  });
});
