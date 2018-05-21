import UserController from '../controllers/usersController';

const userRoutes = (app) => {
  app.get('/api/v1/users', UserController.getAllUsers);
};

export default userRoutes;
