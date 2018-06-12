import UserController from '../controllers/user/usersController';
import SignupValidation from '../validation/user';
import Middleware from '../middleware/users';

const userRoutes = (app) => {
  app.post('/api/v1/auth/signup', SignupValidation.UserSignup, SignupValidation.validateInput, SignupValidation.checkLength, UserController.userSignup);
  app.post('/api/v1/auth/login', SignupValidation.checkUserLogin, UserController.userLogin);
  app.get('/api/v1/users', Middleware.checkUser, Middleware.checkAdmin, UserController.getAllUsers);
  app.get('/api/v1/user', Middleware.checkUser, UserController.getUserProfile);
};

export default userRoutes;
