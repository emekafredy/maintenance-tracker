import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';
import { describe } from 'mocha';

import app from '../../app';

chai.use(chaiHttp);
chai.should();

const user1 = { email: 'notexistent@gmail.com', password: 'faker' };
const user2 = { email: 'tomiwa0456@gmail.com', password: '56789' };

const newRequest = { product: 'laptop', requestType: 'repair', issue: 'not good' };
const incorrectRequest = { product: 'laptop', requestType: 'work', issue: 'not good' };
const invalidRequest = { product: '', requestType: 'repair', issue: 'not good' };

describe('REQUEST ENDPOINTS TEST', () => {
  describe('POST /api/v1/users/requests', () => {
    it('should report 401 on users not logged in', (done) => {
      chai.request(app)
        .post('/api/v1/users/requests')
        .send(user1)
        .end((error, response) => {
          response.status.should.eql(401);
          response.type.should.eql('application/json');
          response.body.message.should.eql('Please Login or Signup to gain access');
          done();
        });
    });
    it('should successfully create a valid request for a logged in user', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send(user2)
        .then((reply) => {
          reply.body.should.have.property('token');
          chai.request(app)
            .post('/api/v1/users/requests')
            .set('authorization', `Bearer ${reply.body.token}`)
            .send(newRequest)
            .end((err, response) => {
              response.should.have.status(201);
              expect(response.body.newRequest.product).to.equal('laptop');
              expect(response.body.newRequest.issue).to.equal('not good');
              response.body.message.should.eql('Request Successfully created');
              done();
            });
        });
    });
    it('should return a message when an input is omitted', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send(user2)
        .then((reply) => {
          reply.body.should.have.property('token');
          chai.request(app)
            .post('/api/v1/users/requests')
            .set('authorization', `Bearer ${reply.body.token}`)
            .send(invalidRequest)
            .end((err, response) => {
              response.should.have.status(400);
              response.body.message.should.eql('The product is required');
              done();
            });
        });
    });
    it('should return a message when an input is inccorrect', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send(user2)
        .then((reply) => {
          reply.body.should.have.property('token');
          chai.request(app)
            .post('/api/v1/users/requests')
            .set('authorization', `Bearer ${reply.body.token}`)
            .send(incorrectRequest)
            .end((err, response) => {
              response.should.have.status(400);
              response.body.message.should.eql('Request type should be either repair, maintenance or replace');
              done();
            });
        });
    });
  });
});
