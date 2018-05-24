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
              expect(response.body.data[0].product).to.equal('headphone');
              expect(response.body.data[0].requesttype).to.equal('replace');
              expect(response.body.data[0].issue).to.equal('The speaker is bad');
              response.body.message.should.eql('Requests successfully retrieved');
              done();
            });
        });
    });
    it('should return 204 status code for successful request without content', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send(user3)
        .then((reply) => {
          reply.body.should.have.property('token');
          chai.request(app)
            .get('/api/v1/users/requests')
            .set('authorization', `Bearer ${reply.body.token}`)
            .end((err, response) => {
              console.log(response);
              response.should.have.status(204);
              done();
            });
        });
    });
  });
});
