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

const newRequest = { product: 'Chair', requestType: 'repair', issue: 'not good' };
const incorrectRequest1 = { product: 'laptop', requestType: 'work', issue: 'not good' };
const incorrectRequest2 = { product: 'work', requestType: 'repair', issue: 'not good' };
const invalidRequest1 = { product: '', requestType: 'repair', issue: 'not good' };
const invalidRequest2 = { product: 'laptop', requestType: '', issue: 'not good' };
const invalidRequest3 = { product: 'laptop', requestType: 'repair', issue: '' };

describe('CREATE REQUEST ENDPOINTS TEST', () => {
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
              expect(response.body.newRequest.product).to.equal('chair');
              expect(response.body.newRequest.issue).to.equal('not good');
              response.body.message.should.eql('Request Successfully created');
              done();
            });
        });
    });
    it('should avoid making duplicate requests with oending status for a logged in user', (done) => {
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
              response.should.have.status(409);
              response.body.message.should.eql('You cannot make duplicate requests until the previous has been processed');
              done();
            });
        });
    });
    it('should return a message when the product input is omitted', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send(user2)
        .then((reply) => {
          reply.body.should.have.property('token');
          chai.request(app)
            .post('/api/v1/users/requests')
            .set('authorization', `Bearer ${reply.body.token}`)
            .send(invalidRequest1)
            .end((err, response) => {
              response.should.have.status(400);
              response.body.errors.product.should.eql('The product is required');
              done();
            });
        });
    });
    it('should return a message when the request type is omitted', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send(user2)
        .then((reply) => {
          reply.body.should.have.property('token');
          chai.request(app)
            .post('/api/v1/users/requests')
            .set('authorization', `Bearer ${reply.body.token}`)
            .send(invalidRequest2)
            .end((err, response) => {
              response.should.have.status(400);
              response.body.errors.requestType.should.eql('Request type is required');
              done();
            });
        });
    });
    it('should return a message when there is no issue description', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send(user2)
        .then((reply) => {
          reply.body.should.have.property('token');
          chai.request(app)
            .post('/api/v1/users/requests')
            .set('authorization', `Bearer ${reply.body.token}`)
            .send(invalidRequest3)
            .end((err, response) => {
              response.should.have.status(400);
              response.body.errors.Issue.should.eql('Please describe the issue with your product');
              done();
            });
        });
    });
    it('should return a message when request type input is incorrect', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send(user2)
        .then((reply) => {
          reply.body.should.have.property('token');
          chai.request(app)
            .post('/api/v1/users/requests')
            .set('authorization', `Bearer ${reply.body.token}`)
            .send(incorrectRequest1)
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
            .send(incorrectRequest2)
            .end((err, response) => {
              response.should.have.status(400);
              response.body.errors.product.should.eql('Invalid entry. Select one out of this list of products: laptop, monitor, chair, desk, charger and headphone');
              done();
            });
        });
    });
  });
});
