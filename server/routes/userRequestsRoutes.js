import UserRequestsController from '../controllers/userRequestsController';
import Middleware from '../middleware/users';

const userRequestRoutes = (app) => {
  app.get('/api/v1/users/requests', Middleware.checkUser, UserRequestsController.getLoggedUsersRequests);
};

export default userRequestRoutes;
