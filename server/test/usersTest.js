import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';
import { describe } from 'mocha';

import app from '../../app';

chai.use(chaiHttp);
chai.should();

const user1 = { email: 'notexistent@gmail.com', password: 'faker' };
const user2 = { email: 'tomiwa0456@gmail.com', password: '56789' };
const user3 = { email: 'emekaadmin@gmail.com', password: '01234' };

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
  });

  describe('Test endpoints to get Users', () => {
    it('Should return All Users', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send(user3)
        .then((reply) => {
          reply.body.should.have.property('token');
          chai.request(app)
            .get('/api/v1/users')
            .set('authorization', `Bearer ${reply.body.token}`)
            .end((err, response) => {
              expect(response).to.have.status(200);
              expect(response.body.status).to.equal('Users successfully retrieved');
              expect(response.body.data[1].firstname).to.equal('Tomiwa');
              expect(response.body.data[1].lastname).to.equal('Olaniyi');
              expect(response.body.data[1].email).to.equal('tomiwa0456@gmail.com');
              expect(response.body.data[1].isadmin).to.equal(false);
              expect(response.body).to.be.an('object');
              done();
            });
        });
    });
    it('should not return users list if user is not an admin', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send(user2)
        .then((reply) => {
          reply.body.should.have.property('token');
          chai.request(app)
            .get('/api/v1/users')
            .set('authorization', `Bearer ${reply.body.token}`)
            .end((err, response) => {
              response.should.have.status(401);
              response.body.message.should.eql('User not an Admin');
              done();
            });
        });
    });
    it('should not also block access to users list for users not logged in', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send(user1)
        .then(() => {
          chai.request(app)
            .get('/api/v1/users')
            .end((err, response) => {
              response.should.have.status(401);
              response.body.message.should.eql('Please Login or Signup to gain access');
              done();
            });
        });
    });
  });

  describe('Test endpoints to sign up Users', () => {
    it('Should return a Should return a success message if user registered succesfully', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send({
          firstName: 'Sandra',
          lastName: 'Taiwo',
          email: 'saandra@gmail.com',
          password: 'password',
        })
        .end((error, response) => {
          expect(response).to.have.status(201);
          expect(response.body).to.be.an('object');
          response.body.message.should.eql('Welcome Sandra');
          done();
        });
    });
    it('Should return a Should return a conflict error message if email has already been registered', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send({
          firstName: 'Sandra',
          lastName: 'Taiwo',
          email: 'saandra@gmail.com',
          password: 'mypassword',
        })
        .end((error, response) => {
          expect(response).to.have.status(409);
          expect(response.body).to.be.an('object');
          response.body.message.should.eql('An account has already been created with this email address');
          done();
        });
    });
    it('Should return a Should return a message if a required input is not made', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send({
          firstName: '',
          lastName: 'Taiwo',
          email: 'saandra@gmail.com',
          password: 'password',
        })
        .end((error, response) => {
          expect(response).to.have.status(400);
          expect(response.body).to.be.an('object');
          response.body.message.should.eql('Your first name is required');
          done();
        });
    });
    it('Should return a Should return a message for invalid input', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send({
          firstName: 'Sandra',
          lastName: 'Taiwo',
          email: 'saandra@com',
          password: 'mypassword',
        })
        .end((error, response) => {
          expect(response).to.have.status(400);
          expect(response.body).to.be.an('object');
          response.body.message.should.eql('Your email is invalid');
          done();
        });
    });
  });

  describe('Test endpoint for users login', () => {
    it('Should return a token for successful login with the correct email and password', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'saandra@com',
          password: 'password',
        })
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          done();
        });
    });
    it('Should return an error message when a user logs in with the wrong parameters', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'saandra@com',
          password: 'paord',
        })
        .end((error, response) => {
          expect(response).to.have.status(409);
          expect(response.body).to.be.an('object');
          response.body.message.should.eql('Your email or password is incorrect');
          done();
        });
    });
  });
});
