import AdminRequestsController from '../controllers/admin/adminRequestsController';
import Middleware from '../middleware/users';

const adminRequestsRoutes = (app) => {
  app.get('/api/v1/requests', Middleware.checkUser, Middleware.checkAdmin, AdminRequestsController.getAllRequests);
  app.get('/api/v1/requests/:requestId', Middleware.checkUser, Middleware.checkAdmin, AdminRequestsController.getRequest);
  app.put('/api/v1/requests/:requestId/:status', Middleware.checkUser, Middleware.checkAdmin, AdminRequestsController.processARequest);
};

export default adminRequestsRoutes;
