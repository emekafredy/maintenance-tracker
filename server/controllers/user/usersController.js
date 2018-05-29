import jwt from 'jsonwebtoken';
import validator from 'validator';
import client from '../../models/database';


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

  static signUpQuery(request, response, query, newUser) {
    const regMail = request.body.email;
    client.query({ text: 'SELECT * FROM users where email = $1', values: [regMail] }).then((foundmail) => {
      if (foundmail.rowCount === 0) {
        return client.query(query).then(user => user)
          .then(user => jwt.sign({ user }, 'secretKey', () => response.status(201).json({
            message: `Welcome ${newUser.firstName}`,
            newUser,
          })))
          .catch(error => response.status(404).json({ message: error.message }));
      }
      return response.status(409).json({
        message: 'An account has already been created with this email address',
      });
    });
  }

  static userSignup(request, response) {
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
    return UserController.signUpQuery(request, response, query, newUser);
  }

  static userLogin(request, response) {
    const regMail = request.body.email;
    const regPass = request.body.password;

    client.query({ text: 'SELECT * FROM users where email = $1 and password = $2', values: [regMail, regPass] })
      .then((foundmail) => {
        if (foundmail.rowCount === 1 && regPass) {
          jwt.sign({ user: foundmail.rows[0] }, 'secretKey', (err, token) => response.json({
            foundmail: foundmail.rows,
            token,
          }))
            .catch(error => response.status(404).json({ message: error.message }));
        }
        response.status(409).json({
          message: 'Your email or password is incorrect',
        });
        return null;
      });
  }
}

export default UserController;
