import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';
import winston from 'winston';
// import request from 'request';
import app from '../../app';
import requests from '../data/requests';

chai.use(chaiHttp);
chai.should();

describe('TEST REQUESTS ENDPOINTS', () => {
  describe('Test endpoints to get requests', () => {
    it('Should return All Requests', (done) => {
      chai.request(app)
        .get('/api/v1/users/requests')
        .end((error, response) => {
          expect(requests[0].product).to.equal('laptop charger');
          expect(response).to.have.status(200);
          expect(response.body).to.be.an('object');
          done();
        });
    });
  });

  describe('Test endpoints to get requests', () => {
    it('Should return a successful message request is made with specified ID that exists', (done) => {
      chai.request(app)
        .get('/api/v1/users/requests/2')
        .end((error, response) => {
          expect(response).to.be.an('object');
          response.should.have.status(200);
          done();
        });
    });

    it('Should return a 404 message for invalid parameters', (done) => {
      chai.request(app)
        .get('/api/v1/users/requests/10')
        .end((error, response) => {
          expect(response).to.be.an('object');
          response.should.have.status(404);
          response.body.message.should.eql('Request does not exist');
          done();
        });
    });
  });
});

