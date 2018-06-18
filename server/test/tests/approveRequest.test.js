import chaiHttp from 'chai-http';
import chai from 'chai';
import { describe } from 'mocha';
import dotenv from 'dotenv';

import app from '../../../app';

dotenv.config();
chai.use(chaiHttp);
chai.should();

const userPass = process.env.USER_PASSWORD;
const adminPass = process.env.ADMIN_PASSWORD;
const user1 = { email: 'notexistent@gmail.com', password: 'faker' };
const user2 = { email: 'tomiwa0456@gmail.com', password: userPass };
const user3 = { email: 'emekaadmin@gmail.com', password: adminPass };

const approvedRequest = {
  requestStatus: 'approved',
};

describe('APPROVE REQUEST ENDPOINTS TEST', () => {
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
    it('should successfully approve user requests as an admin', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send(user3)
        .then((reply) => {
          reply.body.should.have.property('token');
          chai.request(app)
            .put('/api/v1/requests/4/approve')
            .set('authorization', `Bearer ${reply.body.token}`)
            .send(approvedRequest)
            .end((err, response) => {
              response.should.have.status(200);
              response.body.message.should.eql('Request has been approved');
              done();
            });
        });
    });
    it('should report 400 if resquest has already been processed', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send(user3)
        .then((reply) => {
          reply.body.should.have.property('token');
          chai.request(app)
            .put('/api/v1/requests/4/approve')
            .set('authorization', `Bearer ${reply.body.token}`)
            .send(approvedRequest)
            .end((err, response) => {
              response.should.have.status(400);
              response.body.message.should.eql('Request has already been approved');
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
  it('should return a message if an invalid parameter is used in URL', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(user3)
      .then((reply) => {
        reply.body.should.have.property('token');
        chai.request(app)
          .put('/api/v1/requests/abd/disapprove')
          .set('authorization', `Bearer ${reply.body.token}`)
          .send(approvedRequest)
          .end((err, response) => {
            response.should.have.status(400);
            response.body.message.should.eql('Your request ID is invalid. Please enter a number');
            done();
          });
      });
  });
});
