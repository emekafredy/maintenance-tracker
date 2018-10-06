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

const validInput = {
  firstName: 'Sandra', lastName: 'Taiwo', email: 'saandra@gmail.com', password: 'mypassword',
};

const invalidEmail = {
  firstName: 'Sandra', lastName: 'Taiwo', email: 'saandra@com', password: 'mypassword',
};

const noFirstName = {
  firstName: '', lastName: 'Taiwo', email: 'saandra@gmail.com', password: 'password',
};
const noLastName = {
  firstName: 'Sandra', lastName: '', email: 'saandra@gmail.com', password: 'password',
};
const noEmail = {
  firstName: 'Sandra', lastName: 'Taiwo', email: '', password: 'password',
};
const noPassword = {
  firstName: 'Sandra', lastName: 'Taiwo', email: 'saandra@gmail.com', password: '',
};
const emptyFields = {
  firstName: '', lastName: '', email: '', password: '',
};
const shortPassword = {
  firstName: 'Sandra', lastName: 'Taiwo', email: 'saandra@gmail.com', password: 'mypas',
};
const tooLongPassword = {
  firstName: 'Sandra', lastName: 'Taiwo', email: 'saandra@gmail.com', password: 'mypasswordisverylong',
};

const validLogin = { email: 'saandra@gmail.com', password: 'mypassword' };
const invalidLogin1 = { email: 'saandra@gmail.com', password: 'mypasswo' };
const invalidLogin2 = { email: 'saandra@gmail.c', password: 'mypassword' };
const emptyEmail = { email: '', password: 'mypassword' };
const emptyPasssword = { email: 'saandra@gmail.com', password: '' };
const emptyFields2 = { email: '', password: '' };


describe('USERS ENDPOINTS TEST', () => {
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
          response.body.message.should.eql('Oops! page not found');
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
    it('should also block access to users list for users not logged in', (done) => {
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
    it('Should return a success message if user registered succesfully', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(validInput)
        .end((error, response) => {
          expect(response).to.have.status(201);
          expect(response.body).to.be.an('object');
          response.body.user.isadmin.should.eql(false);
          done();
        });
    });
    it('Should return a Should return a conflict error message if email has already been registered', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(validInput)
        .end((error, response) => {
          expect(response).to.have.status(409);
          expect(response.body).to.be.an('object');
          response.body.errors.email.should.eql('An account has already been created with this email address');
          done();
        });
    });
    it('Should return a Should return an error message if the first name field is empty', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(noFirstName)
        .end((error, response) => {
          expect(response).to.have.status(400);
          expect(response.body).to.be.an('object');
          response.body.errors.firstName.should.eql('First name is required');
          done();
        });
    });
    it('Should return a Should return an error message if the last name field is empty', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(noLastName)
        .end((error, response) => {
          expect(response).to.have.status(400);
          expect(response.body).to.be.an('object');
          response.body.errors.lastName.should.eql('Last name is required');
          done();
        });
    });
    it('Should return a Should return an error message if the email field is empty', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(noEmail)
        .end((error, response) => {
          expect(response).to.have.status(400);
          expect(response.body).to.be.an('object');
          response.body.errors.email.should.eql('Your email is required');
          done();
        });
    });
    it('Should return a Should return an error message if the password field is empty', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(noPassword)
        .end((error, response) => {
          expect(response).to.have.status(400);
          expect(response.body).to.be.an('object');
          response.body.errors.password.should.eql('Your password is required');
          done();
        });
    });
    it('Should return a Should return an error message if all fields are empty', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(emptyFields)
        .end((error, response) => {
          expect(response).to.have.status(400);
          expect(response.body).to.be.an('object');
          response.body.errors.firstName.should.eql('First name is required');
          response.body.errors.lastName.should.eql('Last name is required');
          response.body.errors.email.should.eql('Your email is required');
          response.body.errors.password.should.eql('Your password is required');
          done();
        });
    });
    it('Should return a Should return an error message if password length is less than 6', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(shortPassword)
        .end((error, response) => {
          expect(response).to.have.status(400);
          expect(response.body).to.be.an('object');
          response.body.errors.password.should.eql('your Password length should be between 6 and 15');
          done();
        });
    });
    it('Should return a Should return an error message if password length is less than 6', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(tooLongPassword)
        .end((error, response) => {
          expect(response).to.have.status(400);
          expect(response.body).to.be.an('object');
          response.body.errors.password.should.eql('your Password length should be between 6 and 15');
          done();
        });
    });
    it('Should return a Should return a message for invalid input', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(invalidEmail)
        .end((error, response) => {
          expect(response).to.have.status(400);
          expect(response.body).to.be.an('object');
          response.body.errors.email.should.eql('Your email is invalid');
          done();
        });
    });
  });

  describe('Test endpoint for users login', () => {
    it('Should return a token for successful login with the correct email and password', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send(validLogin)
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          done();
        });
    });
    it('Should return an error message when a user logs in with the wrong parameters', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send(invalidLogin1)
        .end((error, response) => {
          expect(response).to.have.status(400);
          expect(response.body).to.be.an('object');
          response.body.errors.password.should.eql('Your email or password is incorrect');
          done();
        });
    });
    it('Should return an error message when a user logs in with the wrong parameters', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send(invalidLogin2)
        .end((error, response) => {
          expect(response).to.have.status(400);
          expect(response.body).to.be.an('object');
          response.body.errors.email.should.eql('Your email or password is incorrect');
          done();
        });
    });
    it('Should return an error message when there is no email input', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send(emptyEmail)
        .end((error, response) => {
          expect(response).to.have.status(400);
          expect(response.body).to.be.an('object');
          response.body.errors.email.should.eql('Your email is required');
          done();
        });
    });
    it('Should return an error message when there is no password input', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send(emptyPasssword)
        .end((error, response) => {
          expect(response).to.have.status(400);
          expect(response.body).to.be.an('object');
          response.body.errors.password.should.eql('Your password is required');
          done();
        });
    });
    it('Should return an error message when both are absent', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send(emptyFields2)
        .end((error, response) => {
          expect(response).to.have.status(400);
          expect(response.body).to.be.an('object');
          response.body.errors.email.should.eql('Your email is required');
          response.body.errors.password.should.eql('Your password is required');
          done();
        });
    });
  });
});
