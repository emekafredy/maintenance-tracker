import AdminRequestsController from '../controllers/admin/adminRequestsController';
import Middleware from '../middleware/users';
import ApproveRequest from '../controllers/admin/approveRequest';
import DisapproveRequest from '../controllers/admin/disapproveRequest';
import ResolveRequest from '../controllers/admin/resolveRequest';

const adminRequestsRoutes = (app) => {
  app.get('/api/v1/requests', Middleware.checkUser, Middleware.checkAdmin, AdminRequestsController.getAllRequests);
  app.put('/api/v1/requests/:requestId/approve', Middleware.checkUser, Middleware.checkAdmin, ApproveRequest.approveARequest);
  app.put('/api/v1/requests/:requestId/disapprove', Middleware.checkUser, Middleware.checkAdmin, DisapproveRequest.disapproveARequest);
  app.put('/api/v1/requests/:requestId/resolve', Middleware.checkUser, Middleware.checkAdmin, ResolveRequest.resolveARequest);
};

export default adminRequestsRoutes;
