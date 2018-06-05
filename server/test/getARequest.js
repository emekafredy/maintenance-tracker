import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';
import { describe } from 'mocha';

import app from '../../app';

chai.use(chaiHttp);
chai.should();

const user1 = { email: 'notexistent@gmail.com', password: 'faker' };
const user2 = { email: 'tomiwa0456@gmail.com', password: '56789' };
const user3 = { email: 'emekaadmin@gmail.com', password: '01234' };

describe('REQUEST ENDPOINTS TEST', () => {
  describe('GET /api/v1/users/requests/:requestId', () => {
    it('should report 401 on users not logged in', (done) => {
      chai.request(app)
        .get('/api/v1/users/requests/1')
        .send(user1)
        .end((error, response) => {
          response.status.should.eql(401);
          response.type.should.eql('application/json');
          response.body.message.should.eql('Please Login or Signup to gain access');
          done();
        });
    });
    it('should return a request of a logged in user', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send(user2)
        .then((reply) => {
          reply.body.should.have.property('token');
          chai.request(app)
            .get('/api/v1/users/requests/4')
            .set('authorization', `Bearer ${reply.body.token}`)
            .end((err, response) => {
              response.should.have.status(200);
              expect(response.body.data[0].product).to.equal('charger');
              expect(response.body.data[0].requesttype).to.equal('repair');
              expect(response.body.data[0].issue).to.equal('Does not charge my laptop anymore');
              response.body.message.should.eql('Retrieved ONE request');
              done();
            });
        });
    });
    it('should return a bad request status code for a request Id that does not belong to logged in user', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send(user2)
        .then((reply) => {
          reply.body.should.have.property('token');
          chai.request(app)
            .get('/api/v1/users/requests/1')
            .set('authorization', `Bearer ${reply.body.token}`)
            .end((err, response) => {
              response.should.have.status(404);
              response.body.message.should.eql('You have no request with this ID');
              done();
            });
        });
    });
    it('should return a user\'s request for logged in admin', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send(user3)
        .then((reply) => {
          reply.body.should.have.property('token');
          chai.request(app)
            .get('/api/v1/requests/4')
            .set('authorization', `Bearer ${reply.body.token}`)
            .end((err, response) => {
              response.should.have.status(200);
              expect(response.body.data[0].product).to.equal('charger');
              expect(response.body.data[0].requesttype).to.equal('repair');
              expect(response.body.data[0].issue).to.equal('Does not charge my laptop anymore');
              response.body.message.should.eql('Retrieved ONE request');
              done();
            });
        });
    });
    it('should return a bad request status code for a request Id that does not exist in the app', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send(user3)
        .then((reply) => {
          reply.body.should.have.property('token');
          chai.request(app)
            .get('/api/v1/requests/15')
            .set('authorization', `Bearer ${reply.body.token}`)
            .end((err, response) => {
              response.should.have.status(404);
              response.body.message.should.eql('There is no request with this ID');
              done();
            });
        });
    });
    it('should return bad request status code when logged in user enters non number', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send(user2)
        .then((reply) => {
          reply.body.should.have.property('token');
          chai.request(app)
            .get('/api/v1/users/requests/yrt')
            .set('authorization', `Bearer ${reply.body.token}`)
            .end((err, response) => {
              response.should.have.status(400);
              response.body.message.should.eql('Your request ID is invalid. Please enter a number');
              done();
            });
        });
    });
  });
});
