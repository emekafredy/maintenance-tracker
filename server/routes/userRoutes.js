import UserController from '../controllers/usersController';

const userRoutes = (app) => {
  app.post('/api/v1/auth/signup', UserController.userSignup);
  app.post('/api/v1/auth/login', UserController.userLogin);
  app.get('/api/v1/users', UserController.getAllUsers);
};

export default userRoutes;
