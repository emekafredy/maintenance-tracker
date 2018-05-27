import jwt from 'jsonwebtoken';
import validator from 'validator';
import client from '../models/database';
import UserValidator from '../validation/user';


class UserController {
  static getAllUsers(request, response, next) {
    client.query('SELECT * FROM users')
      .then(data => response.status(200)
        .json({
          status: 'Users successfully retrieved',
          data: data.rows,
        }))
      .catch(err => next(err));
  }

  static userSignup(request, response, next) {
    const newUser = {
      firstName: validator.trim(String(request.body.firstName)),
      lastName: validator.trim(String(request.body.lastName)),
      email: request.body.email,
      password: validator.trim(String(request.body.password)),
    };
    const query = {
      text: 'INSERT INTO users(firstName, lastName, email, password) VALUES($1, $2, $3, $4)',
      values: [newUser.firstName, newUser.lastName, newUser.email, newUser.password],
    };


    if (UserValidator.checkUser(request, response)) {
      return null;
    }

    const regMail = request.body.email;
    client.query({ text: 'SELECT * FROM users where email = $1', values: [regMail] }).then((foundmail) => {
      if (foundmail.rowCount === 0) {
        return client.query(query).then(user => user)
          .then(user => jwt.sign({ user }, 'secretKey', (err, token) => response.status(201).json({
            message: `Welcome ${newUser.firstName}`,
            newUser,
            token,
          })))
          .catch(error => next(error));
      }
      return response.status(409).json({
        message: 'An account has already been created with this email address',
      });
    });
    return null;
  }

  static userLogin(request, response, next) {
    const regMail = request.body.email;
    const regPass = request.body.password;


    client.query({ text: 'SELECT * FROM users where email = $1 and password = $2', values: [regMail, regPass] })
      .then((foundmail) => {
        if (UserValidator.checkUserLogin(request, response)) {
          return null;
        }
        if (foundmail.rowCount === 1 && regPass) {
          jwt.sign({ user: foundmail.rows[0] }, 'secretKey', (err, token) => response.send({
            foundmail: foundmail.rows,
            token,
          }))
            .catch(error => next(error));
        }
        response.status(409).json({
          message: 'Your email or password is incorrect',
        });
        return null;
      });
  }
}

export default UserController;
