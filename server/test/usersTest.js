import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';
import app from '../../app';
import db from '../models/database';

chai.use(chaiHttp);
chai.should();

describe('ENDPOINTS TEST', () => {
  describe('GET /api/v1', () => {
    it('should return a welcome message on the home page', (done) => {
      chai.request(app)
        .get('/api/v1')
        .end((error, response) => {
          response.status.should.eql(200);
          response.type.should.eql('application/json');
          response.body.message.should.eql('Welcome to M-Tracker App API, Version 1');
          done();
        });
    });
    it('should return an error message on a wrong page', (done) => {
      chai.request(app)
        .get('/api/v')
        .end((error, response) => {
          response.status.should.eql(404);
          response.type.should.eql('application/json');
          response.body.message.should.eql('Sorry, this page does not exist');
          done();
        });
    });
    describe('Test endpoints to get Users', () => {
      it('Should return All Users', (done) => {
        chai.request(app)
          .get('/api/v1/users')
          .end((error, response) => {
            expect(response).to.have.status(200);
            expect(response.body).to.be.an('object');
            done();
          });
      });
    });
  });
});
