import jwt from 'jsonwebtoken';
import validator from 'validator';
import client from '../models/database';
import UserValidator from '../middleware/user';


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
      firstName: validator.trim(request.body.firstName),
      lastName: validator.trim(request.body.lastName),
      email: validator.trim(request.body.email),
      pass: validator.trim(request.body.pass),
    };
    const query = {
      text: 'INSERT INTO users(firstName, lastName, email, pass) VALUES($1, $2, $3, $4)',
      values: [newUser.firstName, newUser.lastName, newUser.email, newUser.pass],
    };


    if (UserValidator.checkUser(request, response)) {
      return null;
    }

    const regMail = request.body.email;
    client.query({ text: 'SELECT * FROM users where email = $1', values: [regMail] }).then((foundmail) => {
      if (foundmail.rowCount === 0) {
        return client.query(query).then(user => user)
          .then((user) => {
            jwt.sign({ user }, 'secretKey', (err, token) => {
              response.send({
                message: `Welcome ${newUser.firstName}`,
                token,
              });
            });
          })
          .catch(error => next(error));
      }
      return response.status(409).json({
        message: 'An account has already been created with this email address',
      });
    }).catch(error => next(error));
    return null;
  }
}

export default UserController;
