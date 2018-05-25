import AdminRequestsController from '../controllers/adminRequestsController';
import Middleware from '../middleware/users';

const adminRequestsRoutes = (app) => {
  app.get('/api/v1/requests', Middleware.checkUser, Middleware.checkAdmin, AdminRequestsController.getAllRequests);
};

export default adminRequestsRoutes;
