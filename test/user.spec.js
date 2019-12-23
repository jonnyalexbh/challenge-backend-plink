const request = require('supertest');
const app = require('../app');

const { encryptPassword } = require('../app/helpers');
const userFactory = require('./factory/userFactory');

describe('Sign Up Creation', () => {
  it('should create an user successfuly', async done => {
    const user = await userFactory.attributes();
    const res = await request(app)
      .post('/users')
      .send(user);
    expect(res.status).toEqual(201);
    expect(res.body.userName).toEqual(user.userName);
    done();
  });
  it('should fail creation of user because for password requirements', async done => {
    const user = await userFactory.attributes();
    const res = await request(app)
      .post('/users')
      .send({ ...user, password: '123456' });
    expect(res.status).toEqual(422);
    expect(res.body.internal_code).toEqual('validation_error');
    expect(res.body.message[0]).toEqual('The password must be at least 8');
    done();
  });
  it('should fail creation of user when the userName exists in the database', async done => {
    const user = await userFactory.create();
    const res = await request(app)
      .post('/users')
      .send(user.dataValues);
    expect(res.status).toEqual(409);
    expect(res.body.message).toEqual('The user entered already exists!');
    done();
  });
  it('should fail when the last name is empty', async done => {
    const user = await userFactory.attributes();
    const res = await request(app)
      .post('/users')
      .send({ ...user, lastName: '' });
    expect(res.status).toEqual(422);
    expect(res.body.message[0]).toEqual('The lastName field is required.');
    done();
  });
});

describe('User Sign-In', () => {
  it('user should authenticate correctly', async () => {
    const user = await userFactory.create({ password: encryptPassword('ubuntu2018') });
    const res = await request(app)
      .post('/users/sessions')
      .send({ userName: user.userName, password: 'ubuntu2018' });
    expect(res.status).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });

  it('user should fail because the data does not exist', async () => {
    const user = await userFactory.attributes();
    const res = await request(app)
      .post('/users/sessions')
      .send({ userName: user.userName, password: user.password });
    expect(res.status).toBe(401);
    expect(res.body.message).toBe('username or password are incorrect');
  });
});
