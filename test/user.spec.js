const request = require('supertest');
const app = require('../app');

const { user } = require('./factory/user');

describe('Sign Up Creation', () => {
  it('should create an user successfuly', async done => {
    const res = await request(app)
      .post('/users/sign-up')
      .send(user);
    expect(res.status).toEqual(201);
    expect(res.body.userName).toEqual(user.userName);
    done();
  });
  it('should fail creation of user because for password requirements', done =>
    request(app)
      .post('/users/sign-up')
      .send({ ...user, password: '123456' })
      .then(res => {
        expect(res.status).toEqual(400);
        expect(res.body.internal_code).toEqual('validation_error');
        expect(res.body.message[0]).toEqual('The password must be at least 8');
        done();
      }));
  it('should fail creation of user when the userName exists in the database', done =>
    request(app)
      .post('/users/sign-up')
      .send({ ...user, userName: 'jonnyalexbh' })
      .then(() => {
        request(app)
          .post('/users/sign-up')
          .send({ ...user, userName: 'jonnyalexbh' })
          .then(res => {
            expect(res.status).toEqual(422);
            expect(res.body.message).toEqual('The user entered already exists!');
            done();
          });
      }));
  it('should fail when the last name is empty', done =>
    request(app)
      .post('/users/sign-up')
      .send({ ...user, lastName: '' })
      .then(res => {
        expect(res.status).toEqual(400);
        expect(res.body.message[0]).toEqual('The lastName field is required.');
        done();
      }));
});
