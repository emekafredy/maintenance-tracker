import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';
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

describe('ALL REQUESTS ENDPOINTS TEST', () => {
  describe('GET /api/v1/users/requests', () => {
    it('should report 401 on users not logged in', (done) => {
      chai.request(app)
        .get('/api/v1/users/requests')
        .send(user1)
        .end((error, response) => {
          response.status.should.eql(401);
          response.type.should.eql('application/json');
          response.body.message.should.eql('Please Login or Signup to gain access');
          done();
        });
    });
    it('should return all requests of a logged in user', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send(user2)
        .then((reply) => {
          reply.body.should.have.property('token');
          chai.request(app)
            .get('/api/v1/users/requests')
            .set('authorization', `Bearer ${reply.body.token}`)
            .end((err, response) => {
              response.should.have.status(200);
              expect(response.body.data[0].product).to.equal('laptop');
              expect(response.body.data[0].requesttype).to.equal('repair');
              expect(response.body.data[0].issue).to.equal('It shuts down on its own');
              response.body.message.should.eql('Requests successfully retrieved');
              done();
            });
        });
    });
    it('should return a message for a successful request without content', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send(user3)
        .then((reply) => {
          reply.body.should.have.property('token');
          chai.request(app)
            .get('/api/v1/users/requests')
            .set('authorization', `Bearer ${reply.body.token}`)
            .end((err, response) => {
              response.should.have.status(200);
              response.body.message.should.eql('You have no requests record yet');
              done();
            });
        });
    });
  });

  describe('GET /api/v1/requests', () => {
    it('should report 401 on users not logged in', (done) => {
      chai.request(app)
        .get('/api/v1/requests')
        .send(user1)
        .end((error, response) => {
          response.status.should.eql(401);
          response.type.should.eql('application/json');
          response.body.message.should.eql('Please Login or Signup to gain access');
          done();
        });
    });
    it('should return all requests for every user, accessible only to the admin', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send(user3)
        .then((reply) => {
          reply.body.should.have.property('token');
          chai.request(app)
            .get('/api/v1/requests')
            .set('authorization', `Bearer ${reply.body.token}`)
            .end((err, response) => {
              response.should.have.status(200);
              expect(response.body.data[0].product).to.equal('charger');
              expect(response.body.data[0].requesttype).to.equal('repair');
              expect(response.body.data[0].issue).to.equal('Does not charge my laptop anymore');
              response.body.message.should.eql('Requests retrieved successfully');
              done();
            });
        });
    });
    it('should not grant access to a logged in user who is not an admin', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send(user2)
        .then((reply) => {
          reply.body.should.have.property('token');
          chai.request(app)
            .get('/api/v1/requests')
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
