import jwt from 'jsonwebtoken';
import validator from 'validator';

class UserValidation {
  static checkUser(request, response) {
    const userFirstname = request.body.firstName;
    const userLastName = request.body.lastName;
    const userEmail = request.body.email;
    const userPassword = request.body.password;

    if (!userFirstname) {
      return response.status(400).json({
        message: 'Your first name is required',
      });
    }
    if (!userLastName) {
      return response.status(400).json({
        message: 'Your last name is required',
      });
    }
    if (!userEmail) {
      return response.status(400).json({
        message: 'Your email is required',
      });
    }
    if (userEmail && !validator.isEmail(userEmail)) {
      return response.status(400).json({
        message: 'Your email is invalid',
      });
    }
    if (!userPassword) {
      return response.status(400).json({
        message: 'You did not enter a password',
      });
    }
    return null;
  }
}

export default UserValidation;
