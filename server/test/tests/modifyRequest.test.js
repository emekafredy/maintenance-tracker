import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';
import { describe } from 'mocha';
import dotenv from 'dotenv';

import app from '../../../app';

dotenv.config();
chai.use(chaiHttp);
chai.should();

const userPass = process.env.USER_PASSWORD;
const user1 = { email: 'notexistent@gmail.com', password: 'faker' };
const user2 = { email: 'tomiwa0456@gmail.com', password: userPass };

const updatedRequest = {
  product: 'charger',
  requestType: 'maintenance',
  issue: 'Does not charge my system properly',
};
const partOfData = {
  requestType: 'maintenance',
  issue: 'Does not charge my system anymore',
};
const incorrectupdatedRequest1 = {
  product: 'desk',
  requestType: 'new desk',
};
const incorrectupdatedRequest2 = {
  product: 'my product',
  requestType: 'maintenance',
};

describe('UPDATE REQUEST ENDPOINTS TEST', () => {
  describe('PUT /api/v1/users/requests/:requestId', () => {
    it('should report 401 on users not logged in', (done) => {
      chai.request(app)
        .put('/api/v1/users/requests/2')
        .send(user1)
        .end((error, response) => {
          response.status.should.eql(401);
          response.type.should.eql('application/json');
          response.body.message.should.eql('Please Login or Signup to gain access');
          done();
        });
    });
    it('should successfully update existing request for a logged in user', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send(user2)
        .then((reply) => {
          reply.body.should.have.property('token');
          chai.request(app)
            .put('/api/v1/users/requests/5')
            .set('authorization', `Bearer ${reply.body.token}`)
            .send(updatedRequest)
            .end((err, response) => {
              response.should.have.status(201);
              expect(response.body.updatedRequest.product).to.equal('charger');
              expect(response.body.updatedRequest.issue).to.equal('Does not charge my system properly');
              response.body.message.should.eql('Request successfully updated');
              done();
            });
        });
    });
    it('should return a conflict message when making a duplicate update', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send(user2)
        .then((reply) => {
          reply.body.should.have.property('token');
          chai.request(app)
            .put('/api/v1/users/requests/5')
            .set('authorization', `Bearer ${reply.body.token}`)
            .send(updatedRequest)
            .end((err, response) => {
              response.should.have.status(409);
              response.body.message.should.eql('You have a similar request that has not been processed');
              done();
            });
        });
    });
    it('should be able to successfully update only selected part(s) of the request for a logged in user', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send(user2)
        .then((reply) => {
          reply.body.should.have.property('token');
          chai.request(app)
            .put('/api/v1/users/requests/5')
            .set('authorization', `Bearer ${reply.body.token}`)
            .send(partOfData)
            .end((err, response) => {
              response.should.have.status(201);
              expect(response.body.updatedRequest.product).to.equal('charger');
              expect(response.body.updatedRequest.requestType).to.equal('maintenance');
              expect(response.body.updatedRequest.issue).to.equal('Does not charge my system anymore');
              response.body.message.should.eql('Request successfully updated');
              done();
            });
        });
    });
    it('should return a message when the request type input is incorrect', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send(user2)
        .then((reply) => {
          reply.body.should.have.property('token');
          chai.request(app)
            .put('/api/v1/users/requests/2')
            .set('authorization', `Bearer ${reply.body.token}`)
            .send(incorrectupdatedRequest1)
            .end((err, response) => {
              response.should.have.status(400);
              response.body.errors.requestType.should.eql('Request type should be either repair, maintenance or replace');
              done();
            });
        });
    });
    it('should return a message when the product input is incorrect', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send(user2)
        .then((reply) => {
          reply.body.should.have.property('token');
          chai.request(app)
            .put('/api/v1/users/requests/2')
            .set('authorization', `Bearer ${reply.body.token}`)
            .send(incorrectupdatedRequest2)
            .end((err, response) => {
              response.should.have.status(400);
              response.body.errors.product.should.eql('Invalid entry. Select one out of this list of products: laptop, monitor, chair, desk, charger and headphone');
              done();
            });
        });
    });
    it('should return a not found status code for a request Id that does not belong to logged in user', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send(user2)
        .then((reply) => {
          reply.body.should.have.property('token');
          chai.request(app)
            .put('/api/v1/users/requests/6')
            .set('authorization', `Bearer ${reply.body.token}`)
            .send(updatedRequest)
            .end((err, response) => {
              response.should.have.status(404);
              response.body.message.should.eql('You have no request with this ID');
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
