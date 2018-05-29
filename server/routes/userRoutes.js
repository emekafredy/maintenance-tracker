import UserController from '../controllers/user/usersController';
import Middleware from '../middleware/users';

const userRoutes = (app) => {
  app.post('/api/v1/auth/signup', UserController.userSignup);
  app.post('/api/v1/auth/login', UserController.userLogin);
  app.get('/api/v1/users', Middleware.checkUser, Middleware.checkAdmin, UserController.getAllUsers);
};

export default userRoutes;
