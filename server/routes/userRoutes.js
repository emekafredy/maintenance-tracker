import UserController from '../controllers/usersController';

const userRoutes = (app) => {
  app.post('/api/v1/auth/signup', UserController.userSignup);
  app.get('/api/v1/users', UserController.getAllUsers);
};

export default userRoutes;
