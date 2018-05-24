import UserRequestsController from '../controllers/userRequestsController';
import Middleware from '../middleware/users';

const userRequestRoutes = (app) => {
  app.get('/api/v1/users/requests', Middleware.checkUser, UserRequestsController.getLoggedUsersRequests);
  app.get('/api/v1/users/requests/:requestId', Middleware.checkUser, UserRequestsController.getSingleRequest);
  app.post('/api/v1/users/requests', Middleware.checkUser, UserRequestsController.createRequest);
};

export default userRequestRoutes;
