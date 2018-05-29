import chaiHttp from 'chai-http';
import chai from 'chai';
import { describe } from 'mocha';

import app from '../../app';

chai.use(chaiHttp);
chai.should();

const user1 = { email: 'notexistent@gmail.com', password: 'faker' };
const user2 = { email: 'tomiwa0456@gmail.com', password: '56789' };
const user3 = { email: 'emekaadmin@gmail.com', password: '01234' };

const resolvedRequest = {
  requestStatus: 'resolved',
};

describe('REQUEST ENDPOINTS TEST', () => {
  describe('PUT /api/v1/requests/:requestId/approve', () => {
    it('should report 401 on users not logged in', (done) => {
      chai.request(app)
        .put('/api/v1/requests/2/approve')
        .send(user1)
        .end((error, response) => {
          response.status.should.eql(401);
          response.type.should.eql('application/json');
          response.body.message.should.eql('Please Login or Signup to gain access');
          done();
        });
    });
    it('should successfully resolve approved user requests as an admin', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send(user3)
        .then((reply) => {
          reply.body.should.have.property('token');
          chai.request(app)
            .put('/api/v1/requests/4/resolve')
            .set('authorization', `Bearer ${reply.body.token}`)
            .send(resolvedRequest)
            .end((err, response) => {
              response.should.have.status(200);
              response.body.message.should.eql('Request has been resolved');
              done();
            });
        });
    });
    it('should return a message if an invalid parameter is used in URL', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send(user3)
        .then((reply) => {
          reply.body.should.have.property('token');
          chai.request(app)
            .put('/api/v1/requests/-^7/resolve')
            .set('authorization', `Bearer ${reply.body.token}`)
            .send(resolvedRequest)
            .end((err, response) => {
              response.should.have.status(404);
              response.body.message.should.eql('Your request ID is invalid. Please enter a number');
              done();
            });
        });
    });
    it('should return a 401 status code if user is not an admin', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send(user2)
        .then((reply) => {
          reply.body.should.have.property('token');
          chai.request(app)
            .put('/api/v1/requests/4/approve')
            .set('authorization', `Bearer ${reply.body.token}`)
            .end((err, response) => {
              response.should.have.status(401);
              response.body.message.should.eql('User not an Admin');
              done();
            });
        });
    });
  });
});
