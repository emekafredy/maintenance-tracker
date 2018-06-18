import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const key = process.env.JWT_KEY;

class UserMiddleware {
  /**
   * @description Middleware to verify logged in users
   *
   * @param {Object} request - HTTP Request
   * @param {Object} response - HTTP Response
   *
   * @returns {object} response JSON Object
   */
  static checkUser(request, response, next) {
    if (request.headers.authorization && request.headers.authorization.split(' ')[0] === 'Bearer') {
      const token = request.headers.authorization.split(' ')[1];
      return jwt.verify(token, key, (err, decoded) => {
        if (err) {
          return response.status(401).send({ message: 'Your Token is invalid' });
        }
        request.user = decoded.user;
        return next();
      });
    }
    return response.status(401).send({
      success: false,
      message: 'Please Login or Signup to gain access',
    });
  }

  /**
   * @description Middleware to verify user status as Admin
   *
   * @param {Object} request - HTTP Request
   * @param {Object} response - HTTP Response
   *
   * @returns {object} response JSON Object
   */
  static checkAdmin(request, response, next) {
    if (request.user.isadmin) {
      return next();
    }
    return response.status(401).json({
      success: false,
      message: 'User not an Admin',
    });
  }
}

export default UserMiddleware;
