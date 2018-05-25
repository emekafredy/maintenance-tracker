import jwt from 'jsonwebtoken';
import client from '../models/database';

class UserMiddleware {
  static checkUser(request, response, next) {
    if (request.headers.authorization && request.headers.authorization.split(' ')[0] === 'Bearer') {
      const token = request.headers.authorization.split(' ')[1];
      return jwt.verify(token, 'secretKey', (err, decoded) => {
        if (err) {
          return response.status(401).send({ message: 'Please register or login to gain access' });
        }
        request.user = decoded.user;
        return next();
      });
    }
    return response.status(401).send({ message: 'Please Login or Signup to gain access' });
  }

  static checkAdmin(request, response, next) {
    if (request.user.isadmin) {
      return next();
    }
    return response.status(401).send({ message: 'User not an Admin' });
  }
}

export default UserMiddleware;
