import jwt from 'jsonwebtoken';
import validator from 'validator';

class UserValidation {
  static checkUser(request, response) {
    if (!request.body.firstName) {
      return response.status(400).json({
        message: 'Your first name is required',
      });
    }
    if (!request.body.lastName) {
      return response.status(400).json({
        message: 'Your last name is required',
      });
    }
    if (!request.body.email) {
      return response.status(400).json({
        message: 'Your email is required',
      });
    }
    if (request.body.email && !validator.isEmail(request.body.email)) {
      return response.status(400).json({
        message: 'Your email is invalid',
      });
    }
    if (!request.body.pass) {
      return response.status(400).json({
        message: 'You did not enter a password',
      });
    }
    return null;
  }
}

export default UserValidation;
