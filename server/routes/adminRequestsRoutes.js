import AdminRequestsController from '../controllers/admin/adminRequestsController';
import Middleware from '../middleware/users';

const adminRequestsRoutes = (app) => {
  app.get('/api/v1/requests', Middleware.checkUser, Middleware.checkAdmin, AdminRequestsController.getAllRequests);
  app.put('/api/v1/requests/:requestId/approve', Middleware.checkUser, Middleware.checkAdmin, AdminRequestsController.approveARequest);
  app.put('/api/v1/requests/:requestId/disapprove', Middleware.checkUser, Middleware.checkAdmin, AdminRequestsController.disapproveARequest);
  app.put('/api/v1/requests/:requestId/resolve', Middleware.checkUser, Middleware.checkAdmin, AdminRequestsController.resolveARequest);
};

export default adminRequestsRoutes;
