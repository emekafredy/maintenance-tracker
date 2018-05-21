import db from '../models/database';

class UserController {
  static getAllUsers(request, response, next) {
    db.any('select * from users')
      .then((data) => {
        response.status(200)
          .json({
            status: 'Users successfully retrieved',
            data,
          });
      })
      .catch(err => next(err));
  }
}

export default UserController;
