import UserRequestsController from '../controllers/user/userRequestsController';
import Middleware from '../middleware/users';
import RequestMiddlware from '../middleware/requests';


const userRequestRoutes = (app) => {
  app.get('/api/v1/users/requests', Middleware.checkUser, UserRequestsController.getLoggedUsersRequests);
  app.get('/api/v1/users/requests/:requestId', Middleware.checkUser, UserRequestsController.getSingleRequest);
  app.post('/api/v1/users/requests', Middleware.checkUser, RequestMiddlware.checkRequest, RequestMiddlware.checkUpdateContent, RequestMiddlware.checkDuplicateQuery, UserRequestsController.createRequest);
  app.put('/api/v1/users/requests/:requestId', Middleware.checkUser, RequestMiddlware.checkUpdate, UserRequestsController.updateRequest);
  app.delete('/api/v1/users/requests/:requestId', Middleware.checkUser, RequestMiddlware.checkUpdate, UserRequestsController.deleteRequest);
};

export default userRequestRoutes;
