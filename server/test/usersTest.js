import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';
import app from '../../app';
import { describe } from 'mocha';

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

  describe('Test endpoints to sign up Users', () => {
    it('Should return a Should return a success message if user registered succesfully', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send({
          firstName: 'Sandra',
          lastName: 'Taiwo',
          email: 'saandra@gmail.com',
          pass: 'password',
        })
        .end((error, response) => {
          expect(response).to.have.status(200);
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
          pass: 'password',
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
          pass: 'password',
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
          pass: 'password',
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
          pass: 'password',
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
          pass: 'paord',
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
